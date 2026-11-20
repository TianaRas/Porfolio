// ===== Navbar : ombre au scroll + lien actif =====
const navbar = document.getElementById("navbar");
const links = document.querySelectorAll(".nav-links a");
const sections = [...links].map((l) =>
  document.querySelector(l.getAttribute("href")),
);

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
  const pos = window.scrollY + 120;
  sections.forEach((s, i) => {
    if (s && s.offsetTop <= pos && s.offsetTop + s.offsetHeight > pos) {
      links.forEach((l) => l.classList.remove("active"));
      links[i].classList.add("active");
    }
  });
});
// Déclencher une fois au chargement pour initialiser la navbar
window.dispatchEvent(new Event("scroll"));

// ===== Menu mobile =====
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => navLinks.classList.toggle("open"));
links.forEach((l) =>
  l.addEventListener("click", () => navLinks.classList.remove("open")),
);

// ===== Effet machine à écrire =====
const words = ["web", "mobiles", "complètes", "utiles"];
const typed = document.getElementById("typed");
let w = 0,
  c = 0,
  deleting = false;
function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (!deleting) {
    deleting = true;
    return setTimeout(type, 1400);
  } else if (c > 0) c--;
  else {
    deleting = false;
    w = (w + 1) % words.length;
  }
  setTimeout(type, deleting ? 60 : 110);
}
type();

// ===== Apparition au scroll + barres + compteurs =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("show");
      observer.unobserve(e.target);
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target
        .querySelectorAll(".bar i")
        .forEach((b) => (b.style.width = b.dataset.w + "%"));
      skillObs.unobserve(e.target);
    });
  },
  { threshold: 0.3 },
);
skillObs.observe(document.querySelector(".skills"));

const countObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll("[data-count]").forEach((el) => {
        const target = +el.dataset.count,
          suffix = el.dataset.suffix || "";
        let n = 0;
        const step = Math.max(1, Math.ceil(target / 30));
        const t = setInterval(() => {
          n = Math.min(target, n + step);
          el.textContent = n + suffix;
          if (n === target) clearInterval(t);
        }, 50); // Légèrement ralenti pour la lisibilité
      });
      countObs.unobserve(e.target);
    });
  },
  { threshold: 0.4 },
);
countObs.observe(document.querySelector(".stats"));

// ===== Modal projets =====
const projects = {
  agenda: {
    title: "Agenda personnel",
    desc: "Application d'agenda pour organiser ses tâches, rendez-vous et événements.",
    list: [
      "Ajout, modification et suppression d'événements",
      "Organisation des tâches par date",
      "Base de données MySQL",
      "Architecture organisée et claire",
    ],
    tags: ["PHP", "MySQL", "MVC", "HTML/CSS"],
  },
  tantsaha: {
    title: "Tantsaha Connect — Backend",
    desc: "Backend d'une application de mise en relation et de services agricoles.",
    list: [
      "API REST avec Node.js et Express",
      "Gestion des requêtes API et de CORS",
      "Connexion à une base de données",
      "Soutien à une application de services agricoles",
    ],
    tags: ["Node.js", "Express", "API REST", "CORS"],
    link: "https://github.com/TianaRas/Tantsaha-connect-simulation-petit-projet-",
  },
  pharmagest: {
    title: "PharmaGest — Gestion de pharmacie",
    desc: "Application web de gestion d'une pharmacie, de l'approvisionnement en médicaments jusqu'à leur vente, avec traçabilité des mouvements de stock.",
    list: [
      "Catalogue de médicaments avec catégories et photos",
      "Ventes à la caisse avec reçu PDF et gestion des retours",
      "Commandes fournisseurs, réceptions et suivi des lots",
      "Alertes de stock faible et de péremption (30 jours)",
      "Rôles et permissions : administrateur, pharmacien, caissier, gestionnaire de stock",
      "Rapports PDF et journal d'audit",
    ],
    tags: ["Python", "Django", "SQLite", "Bootstrap", "ReportLab"],
    link: "https://github.com/TianaRas/PharmaGest",
  },
  vtc: {
    title: "CHAUFFLEET — Plateforme VTC",
    desc: "Plateforme de réservation de véhicules avec chauffeur, pensée pour le contexte malgache.",
    list: [
      "Rédaction du cahier des charges",
      "Définition des fonctionnalités et des acteurs",
      "Diagrammes UML",
      "Analyse et conception de la solution",
    ],
    tags: ["UML", "Analyse", "Conception", "draw.io"],
  },
};

const modal = document.getElementById("modal");
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const p = projects[card.dataset.project];
    document.getElementById("mTitle").textContent = p.title;
    document.getElementById("mDesc").textContent = p.desc;
    document.getElementById("mList").innerHTML = p.list
      .map((i) => `<li>${i}</li>`)
      .join("");
    document.getElementById("mTags").innerHTML = p.tags
      .map((t) => `<span>${t}</span>`)
      .join("");

    // Lien GitHub (affiché seulement si le projet en a un)
    const mLink = document.getElementById("mLink");
    if (p.link) {
      mLink.href = p.link;
      mLink.hidden = false;
    } else {
      mLink.hidden = true;
    }

    // Accessibilité : on rend la modale visible aux lecteurs d'écran
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("open");
  });
});

const closeModal = () => {
  modal.classList.remove("open");
  // Accessibilité : on cache à nouveau la modale
  modal.setAttribute("aria-hidden", "true");
};

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== Formulaire : ouvre le client mail =====
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("fname").value;
  const email = document.getElementById("femail").value;
  const msg = document.getElementById("fmsg").value;
  const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
  window.location.href = `mailto:rasoloarinalatiana@gmail.com?subject=${encodeURIComponent("Contact depuis ton portfolio")}&body=${body}`;
  document.getElementById("formNote").textContent =
    "Ton application mail va s'ouvrir…";
});

// ===== Année du footer =====
document.getElementById("year").textContent = new Date().getFullYear();
