// Lecture d'un fichier de réponses .json (tout reste dans le navigateur).
(function () {
  const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = id => document.getElementById(id);
  const STYLES = window.STYLES || [];
  const depot = $("depot");

  function lire(fichier) {
    if (!fichier) return;
    fichier.text().then(t => afficher(JSON.parse(t))).catch(() => {
      $("erreur").textContent = "Ce fichier n'est pas un fichier de réponses valide.";
      $("erreur").hidden = false;
    });
  }
  $("fichier").addEventListener("change", e => lire(e.target.files[0]));
  depot.addEventListener("dragover", e => { e.preventDefault(); depot.classList.add("survol"); });
  depot.addEventListener("dragleave", () => depot.classList.remove("survol"));
  depot.addEventListener("drop", e => { e.preventDefault(); depot.classList.remove("survol"); lire(e.dataTransfer.files[0]); });

  const parNote = l => [...l].sort((a, b) => (b.note ?? -1) - (a.note ?? -1));
  const noteHtml = n => `<div class="res-note">${n ?? "–"}<small>/10</small></div>`;

  function afficher(d) {
    if (!d || !Array.isArray(d.portfolios)) throw new Error();
    $("erreur").hidden = true;
    $("titre").textContent = `Réponses de ${d.prenom || "…"}`;
    depot.querySelector("input").value = "";
    $("resultats").hidden = false;

    const r = d.resume || {};
    const date = d.date ? new Date(d.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "";
    const liste = (titre, l) => l && l.length ? `<h3>${titre}</h3><p>${l.map(esc).join(" · ")}</p>` : "";
    $("resume").innerHTML = `
      <h3>Envoyé le</h3><p>${esc(date)} — ${esc(r.portfoliosNotes || "")} portfolios et ${esc(r.stylesNotes || "")} styles notés</p>
      ${d.envie ? `<h3>Ce qu'elle veut pour son site</h3><p class="res-com">« ${esc(d.envie)} »</p>` : ""}
      ${liste("Portfolios préférés (7+)", r.portfoliosPreferes)}
      ${liste("Styles préférés (7+)", r.stylesPreferes)}
      ${liste("Coups de cœur", r.coupsDeCoeur)}
      ${liste("Styles rejetés (note ≤ 3 ou « non »)", r.stylesRejetes)}`;

    $("res-p").innerHTML = parNote(d.portfolios).map(p => `
      <div class="res-ligne ${p.note == null ? "non-note" : ""}">
        <a class="res-visuel" href="${esc(p.url)}" target="_blank" rel="noopener"><img src="https://s.wordpress.com/mshots/v1/${encodeURIComponent(p.url)}?w=600&h=375" alt="" loading="lazy"></a>
        <div>
          <div class="res-nom">${esc(p.nom)}</div>
          <div class="badges">
            ${p.coupDeCoeur ? `<span class="badge coeur-b">♥ coup de cœur</span>` : ""}
            ${(p.aime || []).map(a => `<span class="badge oui">👍 ${esc(a)}</span>`).join("")}
            ${(p.aimePas || []).map(a => `<span class="badge non">👎 ${esc(a)}</span>`).join("")}
          </div>
          ${p.commentaire ? `<p class="res-com">« ${esc(p.commentaire)} »</p>` : ""}
        </div>
        ${noteHtml(p.note)}
      </div>`).join("");

    const libelle = { oui: "Oui pour son site", "peut-etre": "Peut-être", non: "Non pour son site" };
    $("res-s").innerHTML = parNote(d.styles || []).map(s => {
      const def = STYLES.find(x => x.id === s.id);
      return `
      <div class="res-ligne ${s.note == null ? "non-note" : ""}">
        <div class="res-visuel">${def ? `<div class="demo-cadre"><div class="demo d-${esc(s.id)}">${def.demo}</div></div>` : ""}</div>
        <div>
          <div class="res-nom">${esc(s.nom)}</div>
          <div class="badges">
            ${s.coupDeCoeur ? `<span class="badge coeur-b">♥ coup de cœur</span>` : ""}
            ${s.pourMonSite ? `<span class="badge ${s.pourMonSite === "oui" ? "oui" : s.pourMonSite === "non" ? "non" : ""}">${libelle[s.pourMonSite] || esc(s.pourMonSite)}</span>` : ""}
          </div>
          ${s.commentaire ? `<p class="res-com">« ${esc(s.commentaire)} »</p>` : ""}
        </div>
        ${noteHtml(s.note)}
      </div>`;
    }).join("");
  }
})();
