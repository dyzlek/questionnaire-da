// Questionnaire : notation des portfolios et des DA, sauvegarde locale, export .json
(function () {
  const S = window.SITE || {};
  const P = window.PORTFOLIOS || [];
  const D = window.STYLES || [];
  const CLE = "questionnaire-portfolios-da-v1";

  // ---------- Réponses (sauvegardées dans le navigateur) ----------
  let R = { prenom: "", envie: "", items: {} };
  try { const s = JSON.parse(localStorage.getItem(CLE)); if (s && s.items) R = s; } catch (e) {}
  function sauver() { try { localStorage.setItem(CLE, JSON.stringify(R)); } catch (e) {} majProgression(); }
  const rep = id => R.items[id] || (R.items[id] = {});

  const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = id => document.getElementById(id);

  // ---------- Textes généraux ----------
  document.title = `${S.nom || "Ton avis"} — portfolios & DA`;
  $("site-nom").textContent = S.nom || "Ton avis";
  $("site-surtitre").textContent = S.surtitre || "";
  $("site-accroche").textContent = S.accroche || "";
  $("site-intro").textContent = S.intro || "";
  $("aide-envoi").textContent = S.envoi || "";
  $("pied").textContent = S.piedDePage || "";

  // ---------- Rendu d'une carte ----------
  function apercuPortfolio(p) {
    const shot = "https://s.wordpress.com/mshots/v1/" + encodeURIComponent(p.url) + "?w=1200&h=750";
    return `<a class="apercu" href="${esc(p.url)}" target="_blank" rel="noopener">
      <img src="${shot}" alt="Aperçu du site ${esc(p.nom)}" loading="lazy">
      <span class="apercu-ouvrir">Ouvrir le site ↗</span></a>`;
  }

  function remplacement(titre) {
    let h = 0; for (const c of titre) h = (h * 31 + c.charCodeAt(0)) % 360;
    return `<div class="remplacement" style="background:linear-gradient(135deg,hsl(${h} 55% 52%),hsl(${(h + 50) % 360} 60% 35%))">${esc(titre.charAt(0))}</div>`;
  }

  function corps(it, type, i, total) {
    const r = R.items[it.id] || {};
    const note = r.note;
    let h = `<div class="item-tete"><div>
        <p class="item-num">${i + 1} / ${total}</p>
        <h3>${esc(it.nom)}</h3>
        ${type === "p" ? `<a class="item-lien" href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))} ↗</a>` : ""}
      </div>${note ? `<span class="etat">✓ noté</span>` : ""}</div>`;

    if (type === "s") {
      const q = encodeURIComponent(it.recherche || it.nom);
      h += `<p class="item-desc">${esc(it.description)}</p>
        <ul class="mots">${(it.motsCles || []).map(m => `<li>${esc(m)}</li>`).join("")}</ul>
        <div class="exemples">Voir des exemples :
          <a href="https://www.pinterest.com/search/pins/?q=${q}" target="_blank" rel="noopener">Pinterest ↗</a>
          <a href="https://dribbble.com/search/${q}" target="_blank" rel="noopener">Dribbble ↗</a></div>`;
    }

    h += `<div><span class="q-titre">Ta note</span><div class="notes" role="group" aria-label="Note de 1 à 10">`;
    for (let n = 1; n <= 10; n++) {
      h += `<button type="button" data-act="note" data-v="${n}" aria-pressed="${note === n}" class="${note && n < note ? "allume" : ""}">${n}</button>`;
    }
    h += `</div><div class="notes-legende"><span>Pas du tout</span><span>J'adore</span></div></div>`;

    if (type === "p") {
      h += `<div><span class="q-titre">Ce qui te plaît <small>(1 clic = 👍, 2 clics = 👎)</small></span><div class="ligne-actions">
        ${(S.aspects || []).map(a => `<button type="button" class="puce" data-act="aspect" data-v="${esc(a)}" data-etat="${(r.aspects || {})[a] || 0}">${esc(a)}</button>`).join("")}
      </div></div>`;
    } else {
      h += `<div><span class="q-titre">Pour ton site ?</span><div class="choix" role="group">
        ${[["oui", "Oui"], ["peut-etre", "Peut-être"], ["non", "Non"]].map(([v, l]) =>
          `<button type="button" data-act="choix" data-v="${v}" aria-pressed="${r.pourMonSite === v}">${l}</button>`).join("")}
      </div></div>`;
    }

    h += `<div class="ligne-actions"><button type="button" class="coeur" data-act="coeur" aria-pressed="${!!r.coupDeCoeur}">♥ Coup de cœur</button></div>
      <textarea data-act="com" rows="2" placeholder="Un commentaire ? (facultatif)" aria-label="Commentaire">${esc(r.commentaire || "")}</textarea>`;
    return h;
  }

  function construire(liste, type, conteneur) {
    conteneur.innerHTML = liste.map((it, i) => `
      <article class="item ${R.items[it.id]?.note ? "fait" : ""}" id="i-${esc(it.id)}" data-id="${esc(it.id)}" data-type="${type}">
        <div class="item-visuel">${type === "p" ? apercuPortfolio(it) : `<div class="demo-cadre"><div class="demo d-${esc(it.id)}" aria-hidden="true">${it.demo || ""}</div></div>`}</div>
        <div class="item-corps">${corps(it, type, i, liste.length)}</div>
      </article>`).join("");
    conteneur.querySelectorAll(".apercu img").forEach(suivreApercu);
  }

  // Le service de captures renvoie d'abord une petite image d'attente :
  // on affiche un visuel coloré et on réessaie quelques fois.
  function suivreApercu(img) {
    const nom = img.alt.replace("Aperçu du site ", "");
    const fond = Object.assign(document.createElement("div"), { innerHTML: remplacement(nom) }).firstChild;
    fond.style.cssText += ";position:absolute;inset:0";
    img.before(fond);
    let essais = 0;
    const base = img.src;
    img.addEventListener("load", () => {
      if (img.naturalWidth >= 1000) { fond.remove(); return; }
      if (++essais <= 6) setTimeout(() => { img.src = base + "&r=" + essais; }, 5000);
    });
    img.addEventListener("error", () => { img.remove(); });
  }

  construire(P, "p", $("liste-p"));
  construire(D, "s", $("liste-s"));

  function rafraichir(article) {
    const id = article.dataset.id, type = article.dataset.type;
    const liste = type === "p" ? P : D;
    const i = liste.findIndex(x => x.id === id);
    article.querySelector(".item-corps").innerHTML = corps(liste[i], type, i, liste.length);
    article.classList.toggle("fait", !!R.items[id]?.note);
  }

  // ---------- Interactions ----------
  document.addEventListener("click", e => {
    const b = e.target.closest("button[data-act]"); if (!b) return;
    const article = b.closest(".item"); if (!article) return;
    const r = rep(article.dataset.id), v = b.dataset.v;
    if (b.dataset.act === "note") r.note = r.note === +v ? undefined : +v;
    if (b.dataset.act === "coeur") r.coupDeCoeur = !r.coupDeCoeur;
    if (b.dataset.act === "choix") r.pourMonSite = r.pourMonSite === v ? undefined : v;
    if (b.dataset.act === "aspect") {
      r.aspects = r.aspects || {};
      const suivant = { 0: 1, 1: -1, "-1": 0 }[r.aspects[v] || 0];
      if (suivant) r.aspects[v] = suivant; else delete r.aspects[v];
    }
    sauver();
    rafraichir(article);
  });

  document.addEventListener("input", e => {
    if (e.target.dataset.act === "com") { rep(e.target.closest(".item").dataset.id).commentaire = e.target.value; sauver(); }
  });

  $("prenom").value = R.prenom || "";
  $("envie").value = R.envie || "";
  $("prenom").addEventListener("input", e => { R.prenom = e.target.value; sauver(); });
  $("envie").addEventListener("input", e => { R.envie = e.target.value; sauver(); });

  $("masquer-notes").addEventListener("change", e => $("liste-s").classList.toggle("masquer-actif", e.target.checked));

  // ---------- Progression + récap ----------
  const note = id => R.items[id]?.note;
  function majProgression() {
    const np = P.filter(p => note(p.id)).length, ns = D.filter(s => note(s.id)).length;
    $("nb-p").textContent = `${np}/${P.length}`;
    $("nb-s").textContent = `${ns}/${D.length}`;
    $("progression").style.width = ((np + ns) / (P.length + D.length || 1) * 100) + "%";
    majRecap(np, ns);
  }

  function classement(liste) {
    return liste.filter(x => note(x.id)).sort((a, b) => note(b.id) - note(a.id));
  }

  function majRecap(np, ns) {
    const total = P.length + D.length;
    const topP = classement(P).filter(x => note(x.id) >= 7).slice(0, 3);
    const topS = classement(D).filter(x => note(x.id) >= 7).slice(0, 5);
    const coeurs = [...P, ...D].filter(x => R.items[x.id]?.coupDeCoeur);
    const manquants = [...P, ...D].filter(x => !note(x.id));
    const li = x => `<li>${esc(x.nom)} — <b>${note(x.id)}</b>/10</li>`;
    $("recap").innerHTML = `
      <h3>Avancement</h3>
      <p class="gros">${np + ns} <small style="font-size:1rem">/ ${total} notés</small></p>
      ${manquants.length ? `<p class="manquants">Pas encore notés : ${manquants.slice(0, 12).map(x => `<a href="#i-${esc(x.id)}">${esc(x.nom)}</a>`).join(", ")}${manquants.length > 12 ? "…" : ""}<br>Tu peux quand même envoyer tes réponses.</p>` : `<p class="manquants">Tout est noté, merci !</p>`}
      ${topP.length ? `<h3>Tes portfolios préférés</h3><ol>${topP.map(li).join("")}</ol>` : ""}
      ${topS.length ? `<h3>Tes styles préférés</h3><ol>${topS.map(li).join("")}</ol>` : ""}
      ${coeurs.length ? `<h3>Coups de cœur</h3><p>${coeurs.map(x => esc(x.nom)).join(", ")}</p>` : ""}`;
  }
  majProgression();

  // ---------- Export .json ----------
  function exporter() {
    const aspectsDe = (r, v) => Object.entries(r.aspects || {}).filter(([, e]) => e === v).map(([a]) => a);
    const portfolios = P.map(p => {
      const r = R.items[p.id] || {};
      return { id: p.id, nom: p.nom, url: p.url, note: r.note ?? null, coupDeCoeur: !!r.coupDeCoeur,
        aime: aspectsDe(r, 1), aimePas: aspectsDe(r, -1), commentaire: r.commentaire || "" };
    });
    const styles = D.map(s => {
      const r = R.items[s.id] || {};
      return { id: s.id, nom: s.nom, note: r.note ?? null, coupDeCoeur: !!r.coupDeCoeur,
        pourMonSite: r.pourMonSite || null, commentaire: r.commentaire || "" };
    });
    const tri = l => l.filter(x => x.note != null && x.note >= 7).sort((a, b) => b.note - a.note);
    return {
      questionnaire: "portfolios-da",
      version: 1,
      prenom: R.prenom || "",
      date: new Date().toISOString(),
      envie: R.envie || "",
      resume: {
        portfoliosNotes: portfolios.filter(x => x.note != null).length + "/" + portfolios.length,
        stylesNotes: styles.filter(x => x.note != null).length + "/" + styles.length,
        portfoliosPreferes: tri(portfolios).slice(0, 3).map(x => `${x.nom} (${x.note})`),
        stylesPreferes: tri(styles).slice(0, 5).map(x => `${x.nom} (${x.note})`),
        stylesRejetes: styles.filter(x => (x.note != null && x.note <= 3) || x.pourMonSite === "non").map(x => x.nom),
        coupsDeCoeur: [...portfolios, ...styles].filter(x => x.coupDeCoeur).map(x => x.nom),
      },
      portfolios,
      styles,
    };
  }

  $("telecharger").addEventListener("click", () => {
    const data = exporter();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const nom = (R.prenom || "reponses").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `avis-${nom || "reponses"}-${data.date.slice(0, 10)}.json` });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  $("effacer").addEventListener("click", () => {
    if (!confirm("Effacer toutes tes réponses ? Ça ne peut pas être annulé.")) return;
    R = { prenom: "", envie: "", items: {} };
    sauver();
    location.reload();
  });
})();
