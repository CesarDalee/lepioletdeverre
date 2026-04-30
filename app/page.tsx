"use client"

import { useState, type ReactNode } from "react"
import { FaInstagram } from "react-icons/fa"
import Image from "next/image"
import {
  Check,
  X,
  HeartPulse,
  Truck,
  ShieldCheck,
  Mountain,
} from "lucide-react"

const DONATION_URL = "https://www.leetchi.org/fundraisers/clara-chaperon"
const INSTAGRAM_URL = "https://www.instagram.com/lepioletdeverre"

const images = {
  hero: "/images/hero-lg.jpg",
  paradox1: "/images/paradoxe-1.jpg",
  paradox2: "/images/paradoxe-2.jpg",
  paradox3: "/images/paradoxe-3.jpg",
  paradox4: "/images/paradoxe-4.jpg",
  portraitSnow: "/images/fabienne-neige.jpg",
  iceBg: "/images/palmares.jpg",
  everest: "/images/everest.jpg",
  manaslu: "/images/manaslu.jpg",
  massif: "/images/massif.jpg",
  climbing: "/images/escalade.jpg",
  gasherbrum1: "/images/gasherbrum-1.jpg",
  gasherbrum2: "/images/gasherbrum-2.jpg",
  engagement1: "/images/engagement-1.jpg",
  engagement2: "/images/engagement-2.jpg",
  engagement3: "/images/engagement-3.jpg",
  impact: "/images/impact.jpg",
  logistique: "/images/logistique.png",
  securite: "/images/securite.png",
  expertise: "/images/expertise.png",
  mission: "/images/mission.jpg",
}

function Button({
  children,
  dark = false,
  onClick,
  full = false,
}: {
  children: ReactNode
  dark?: boolean
  onClick?: () => void
  full?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex min-h-[54px] items-center justify-center border-2 border-black px-5 py-3 text-center text-sm font-button uppercase leading-none transition md:min-h-[48px] md:px-6 md:text-lg",
        full ? "w-full md:w-auto" : "",
        dark
          ? "bg-black text-white hover:bg-white hover:text-black"
          : "bg-white text-black hover:bg-black hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

function Img({
  src,
  alt,
  className = "",
  imageClassName = "",
}: {
  src: string
  alt: string
  className?: string
  imageClassName?: string
}) {
  return (
    <div className={`relative overflow-hidden bg-neutral-200 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${imageClassName}`}
      />
    </div>
  )
}

export default function Page() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data = {
      entreprise: formData.get("entreprise"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      alert("Demande envoyée.")
      setIsPopupOpen(false)
    } else {
      alert("Erreur lors de l’envoi.")
    }
  }

  return (
    <main className="w-full overflow-x-clip bg-white text-black">
      {/* TOP BAR */}
      <div className="flex min-h-12 items-center justify-between gap-4 bg-black px-5 py-3 text-xs font-medium text-white md:px-24">
        <p className="max-w-[230px] leading-tight md:max-w-none">
          Contactez directement : clara@you-and.fr / + 33 6 64 49 24 66
        </p>

        <a
          className="flex shrink-0 items-center gap-2"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Suivre Fabienne</span>
          <FaInstagram size={18} />
        </a>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-[#38aee9] text-white">
        <Image
          src={images.hero}
          alt="Montagnes enneigées"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_10%]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/90 md:from-black/10 md:via-black/15 md:to-black/85" />

        <header className="relative z-10 flex items-center justify-between px-5 py-6 md:px-24 md:py-7">
          <Image
            src="/images/logo.png"
            alt="Le Piolet de Verre"
            width={180}
            height={50}
            className="object-contain"
          />

          <div className="hidden items-center gap-6 md:flex">
            <Button onClick={() => setIsPopupOpen(true)}>
              Soutenir en tant qu’entreprise
            </Button>

            <a href={DONATION_URL} target="_blank" rel="noopener noreferrer">
              <Button dark>Faire un don</Button>
            </a>
          </div>
        </header>

        <div className="relative z-10 px-5 pt-24 md:px-24 md:pt-32">
          <p className="font-subtitle mb-6 text-lg uppercase tracking-wide md:text-2xl">
            Le projet Valkyrie
          </p>

          <h1 className="font-title max-w-[1180px] text-[46px] leading-[0.9] tracking-[-0.06em] md:text-[86px]">
            L’exploit au-delà de l’invisible
          </h1>

          <div className="mt-8 max-w-[760px] text-xl font-medium leading-[1.15] md:text-[28px]">
            <p>Derrière l’exploit, une réalité invisible.</p>
            <p>Une femme. Un parcours hors norme. Une volonté intacte.</p>
          </div>

          <div className="mt-10 grid gap-4 md:mt-14 md:flex md:gap-8">
            <a href={DONATION_URL} target="_blank" rel="noopener noreferrer">
              <Button dark full>
                Faire un don
              </Button>
            </a>

            <Button full onClick={() => setIsPopupOpen(true)}>
              Soutenir en tant qu’entreprise →
            </Button>
          </div>
        </div>
      </section>

      {/* VIDEO OVERLAY */}
      <div className="relative z-30 bg-black px-5 pb-16 pt-24 md:px-24 md:pb-28 md:pt-36">
        <div className="absolute left-1/2 top-0 z-10 w-full max-w-[1080px] -translate-x-1/2 -translate-y-1/2 px-5 md:px-0">
          <div className="aspect-video overflow-hidden border-4 border-white bg-black shadow-2xl">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/5Wr5WzufAWE?autoplay=1&mute=1&rel=0&modestbranding=1"
              title="Vidéo projet"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="relative z-20 flex justify-center pt-[30vw] md:pt-[300px]">
          <a
            href="#gasherbrum"
            className="flex max-w-full border-2 border-white bg-black text-white transition hover:bg-white hover:text-black"
          >
            <span className="px-5 py-4 text-2xl font-title uppercase leading-none tracking-[-0.03em] md:px-10 md:py-6 md:text-4xl">
              Voir le projet
            </span>

            <span className="flex items-center justify-center border-l-2 border-white bg-white px-5 text-3xl font-black text-black md:px-10 md:text-5xl">
              »
            </span>
          </a>
        </div>
      </div>

      {/* POPUP */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-black/60 px-5 py-8">
          <div className="relative w-full max-w-2xl bg-white p-6 text-black shadow-2xl md:p-10">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute right-5 top-5 leading-none md:right-8 md:top-8"
            >
              <X size={36} />
            </button>

            <p className="text-sm font-semibold uppercase text-black/50 md:text-lg">
              Entreprises
            </p>

            <h2 className="mt-4 font-title text-[40px] leading-none tracking-[-0.06em] md:text-[56px]">
              Soutenir le projet
            </h2>

            <p className="mt-4 max-w-xl text-lg leading-tight text-black/60 md:text-2xl">
              Laissez vos coordonnées pour être contacté par la personne en
              charge de la cagnotte.
            </p>

            <div className="mt-8 space-y-3 text-base font-semibold md:mt-10 md:space-y-5 md:text-xl">
              <p className="flex items-center gap-3">
                <Check size={24} /> Don anonyme possible
              </p>
              <p className="flex items-center gap-3">
                <Check size={24} /> Aucun affichage public obligatoire
              </p>
              <p className="flex items-center gap-3">
                <Check size={24} /> Dons éligibles à une réduction d’impôt
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="mt-8 space-y-4 md:mt-10">
              <input
                name="entreprise"
                required
                placeholder="Nom de l’entreprise"
                className="w-full border border-black/20 px-4 py-3 text-base outline-none md:px-6 md:py-4 md:text-xl"
              />

              <input
                name="email"
                required
                type="email"
                placeholder="Email professionnel"
                className="w-full border border-black/20 px-4 py-3 text-base outline-none md:px-6 md:py-4 md:text-xl"
              />

              <input
                name="telephone"
                required
                placeholder="Téléphone"
                className="w-full border border-black/20 px-4 py-3 text-base outline-none md:px-6 md:py-4 md:text-xl"
              />

              <button
                type="submit"
                className="mt-6 w-full bg-black px-6 py-4 text-base font-button uppercase text-white transition hover:bg-black/80 md:px-8 md:py-5 md:text-xl"
              >
                Être recontacté
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PARADOXE */}
      <section className="bg-black px-5 py-20 text-white md:px-24 md:py-28">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-4 text-subtitle uppercase tracking-wide">
            Le paradoxe
          </p>

          <h2 className="text-[44px] font-title leading-[0.95] tracking-[-0.04em] md:text-[82px]">
            70 fractures.
            <br />2 sommets de +8000 mètres
          </h2>
        </div>

        <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-5 md:mt-20 md:flex-row md:items-end md:justify-between">
          <Img
            src={images.paradox1}
            alt=""
            className="h-[360px] w-full md:h-[300px] md:w-[23%]"
          />

          <Img
            src={images.paradox2}
            alt=""
            className="h-[220px] w-full md:h-[220px] md:w-[23%]"
          />

          <Img
            src={images.paradox3}
            alt=""
            className="h-[330px] w-full md:h-[260px] md:w-[23%]"
          />

          <Img
            src={images.paradox4}
            alt=""
            className="h-[260px] w-full md:h-[300px] md:w-[23%]"
          />
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <p className="max-w-[960px] text-[28px] font-title leading-[1.05] tracking-[-0.03em] md:text-[34px]">
            Fabienne Sicot-Personnic n’est pas une athlète ordinaire.
            <br />

            <span className="text-white/55">
              Infirmière au CHU de Montpellier et mère de trois enfants,
            </span>
            <br />

            <span className="text-white">
              elle vit avec un double handicap invisible :{" "}
              <span className="text-white/55">
                la maladie des os de verre et la spondylarthrite ankylosante.
              </span>
            </span>
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 items-end gap-12 md:mt-24 md:grid-cols-2">
          <div>
            <blockquote className="font-quote max-w-[420px] text-xl leading-tight md:text-2xl">
              “Ma maladie est mon moteur, pas mon frein. Elle me rappelle chaque
              matin l’urgence de vivre.”
            </blockquote>

            <p className="mt-8 text-sm text-white/50">
              Fabienne Sicot-Personnic
            </p>
          </div>

          <Img
            src={images.portraitSnow}
            alt="Fabienne en montagne"
            className="h-[260px] w-full md:h-[320px]"
          />
        </div>
      </section>

      {/* PALMARÈS */}
      <section className="relative overflow-hidden bg-[#dff6ff] px-5 py-20 md:px-24 md:py-28">
        <Image
          src={images.iceBg}
          alt=""
          fill
          className="object-cover object-[center_80%] opacity-100"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="text-subtitle font-bold uppercase">Le palmarès</p>

          <h2 className="mt-2 text-[44px] font-title leading-[0.95] tracking-[-0.05em] md:text-[76px]">
            Elle a déjà <span className="text-white">dompté</span>
            <br />
            <span className="text-white">l’impossible.</span>
          </h2>

          <p className="font-text mt-8 max-w-xl text-lg leading-tight md:text-xl">
            Ce projet n’est pas un pari, c’est une suite logique. Contre tous
            les pronostics médicaux, son piolet a déjà marqué l’histoire.
          </p>

          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2">
            {[
              {
                img: images.everest,
                altitude: "8849m",
                date: "MAI 2023",
                title: "Ascension de l’Everest",
                description:
                  'Le toit du monde. Une expédition de 2 mois dans la "Zone de la Mort". Fabienne devient la première femme au monde avec sa pathologie à contempler la courbure de la terre depuis ce sommet. Elle y a porté un message pour tous les patients du CHU.',
                tags: ["Record mondial", "60 jours d’expédition"],
              },
              {
                img: images.manaslu,
                altitude: "8163m",
                date: "SEPTEMBRE 2024",
                title: "Ascension du Manaslu",
                description:
                  "Moins d'un an après l'Everest, elle enchaîne avec le 'Sommet de l'Esprit' au Népal. Sans jamais se plaindre des douleurs articulaires chroniques, elle gravit les pentes glacées pour prouver que la régularité est la clé de la résilience.",
                tags: ['2ème “8000”', "Sommet technique"],
              },
            ].map((card) => (
              <article key={card.title} className="relative bg-white shadow-xl">
                <div className="absolute -top-6 right-5 z-20 bg-black px-4 py-3 text-2xl font-altitude text-white md:-top-8 md:right-8 md:px-5 md:text-3xl">
                  {card.altitude}
                </div>

                <Img src={card.img} alt="" className="h-[210px] w-full" />

                <div className="p-5 md:p-6">
                  <p className="text-xs font-bold uppercase text-black/30">
                    {card.date}
                  </p>

                  <h3 className="mt-2 text-2xl font-title tracking-[-0.04em] md:text-3xl">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-base leading-tight text-black/40">
                    {card.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {card.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className={`border border-black px-3 py-1 text-xs font-title uppercase ${
                          i === 0 ? "bg-black text-white" : "bg-white"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div className="hidden md:block" />

            <div className="self-end">
              <Img src={images.massif} alt="" className="h-[220px] md:h-[250px]" />

              <div className="bg-white/0 p-0 pt-6 backdrop-blur-sm md:p-8">
                {[
                  ["MONTBLANC", "4 807 M", "Juillet 2022"],
                  ["MONT MAUDIT", "4 462 M", "Juillet 2022"],
                  ["MONT BLANC DU TACUL", "4 248 M", "Juillet 2022"],
                  ["BREITHORN", "4 164 M", "Été 2021"],
                  ["AIGUILLE VERTE", "4 122 M", "1999"],
                ].map(([name, altitude, date]) => (
                  <div
                    key={name}
                    className="flex justify-between gap-4 border-b border-black/20 py-4"
                  >
                    <p className="text-xl font-title md:text-2xl">{name}</p>

                    <div className="shrink-0 text-right">
                      <p className="font-black">{altitude}</p>
                      <p className="text-sm">{date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-white px-5 py-20 md:px-24 md:py-28">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-lg uppercase md:text-xl">
            Course contre la maladie
          </p>

          <h2 className="mt-3 text-[44px] font-title leading-none tracking-[-0.05em] md:text-[72px]">
            Le compte à rebours est lancé
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-12 md:mt-16 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-12 md:justify-between">
            <div>
              <h3 className="text-[30px] font-title uppercase leading-[0.95] tracking-[-0.04em] md:text-[36px]">
                Le temps est l’adversaire
                <br />
                le plus redoutable...
              </h3>

              <p className="mt-6 max-w-md text-base leading-tight md:text-lg">
                Sa pathologie est évolutive : chaque jour qui passe est un défi
                lancé à sa mobilité future.
              </p>
            </div>

            <div>
              <p className="max-w-md text-base leading-tight md:text-lg">
                Juin 2026 est la date limite de son ultime ambition. C’est une
                véritable course contre la montre.
              </p>

              <h3 className="mt-8 text-[30px] font-title uppercase leading-[0.95] tracking-[-0.04em] md:text-[36px]">
                L’urgence n’est pas
                <br />
                seulement sportive,
                <br />
                elle est vitale.
              </h3>
            </div>
          </div>

          <Img src={images.climbing} alt="" className="h-[360px] md:h-[560px]" />
        </div>
      </section>

      {/* GASHERBRUM */}
      <section
        id="gasherbrum"
        className="relative overflow-hidden bg-[#e6f8ff] px-5 py-20 md:px-24 md:py-24"
      >
        <Image
          src={images.mission}
          alt=""
          fill
          className="scale-x-[-1] bg-white/0 object-cover object-top opacity-30"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="text-center text-base font-subtitle uppercase md:text-lg">
            L’ultime objectif - Juin 2026
          </p>

          <h2 className="mx-auto max-w-full overflow-hidden text-center font-gasherbrum text-[clamp(46px,16vw,190px)] uppercase leading-[0.9] tracking-[-0.04em] md:tracking-[-0.07em]">
            Gasherbrum
          </h2>

          <p className="mt-8 max-w-2xl text-base font-text leading-tight md:text-lg">
            Le massif du Karakoram abrite les montagnes les plus sauvages et
            techniques de la planète.{" "}
            <span className="font-bold">
              Le projet : enchaîner le Gasherbrum I et le Gasherbrum II en une
              seule fois.
            </span>
          </p>

          <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
            <Img src={images.gasherbrum1} alt="" className="h-[240px] md:h-[340px]" />

            <div className="self-center">
              <div className="inline-block bg-black px-5 py-3 text-3xl font-altitude text-white md:text-4xl">
                8080m
              </div>

              <h3 className="mt-3 inline-block max-w-full bg-white px-5 py-2 text-[44px] font-title uppercase leading-[0.9] tracking-[-0.05em] md:text-5xl">
                Gasherbrum 1
              </h3>

              <p className="mt-6 max-w-md leading-tight">
                Ancien K5, situé dans la vallée du Karakoram au Pakistan.
                <br />
                Sommet frontalier de la Chine et du Pakistan.
              </p>

              <p className="mt-6 max-w-md leading-tight">
                11ème plus haut sommet.
                <br />
                3ème sommet de 8000m le plus technique.
                <br />
                Moins de 10 Français ont réussi à atteindre
                <br />
                le sommet... et revenir.
              </p>
            </div>

            <div>
              <div className="inline-block bg-black px-5 py-3 text-3xl font-altitude text-white md:text-4xl">
                8035m
              </div>

              <h3 className="mt-3 inline-block max-w-full bg-white px-5 py-2 text-[44px] font-title uppercase leading-[0.9] tracking-[-0.05em] md:text-5xl">
                Gasherbrum 2
              </h3>

              <div className="mt-6 max-w-md space-y-4 leading-tight">
                <p>
                  Ancien K4, situé dans la vallée du Karakoram au Pakistan.
                  <br />
                  Sommet frontalier de la Chine et du Pakistan.
                  <br />
                  <span className="font-semibold">
                    13ème plus haut sommet.
                  </span>
                </p>

                <p>
                  <span className="font-semibold">
                    6ème sommet de 8000m le plus technique.
                  </span>
                  <br />
                  En bref : une double ascension, Gasherbrum I et II,
                  <br />
                  au cours d’une même expédition.
                </p>
              </div>

              <blockquote className="mt-10 max-w-md text-base italic leading-[1.3] md:text-lg">
                “Si elle y parvient,{" "}
                <span className="font-semibold not-italic">
                  elle sera la deuxième française
                </span>{" "}
                à réaliser ce doublet et{" "}
                <span className="font-semibold not-italic">
                  la première au monde
                </span>{" "}
                tout genre confondu avec deux handicaps.”
              </blockquote>
            </div>

            <Img src={images.gasherbrum2} alt="" className="h-[240px] md:h-[340px]" />
          </div>

          <div className="mt-16 flex justify-start md:mt-20 md:justify-end">
            <a
              href={DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex border-2 border-black"
            >
              <div className="bg-black px-5 py-4 text-white md:px-8 md:py-5">
                <p className="text-3xl font-title uppercase leading-none md:text-5xl">
                  Départ 20 juin
                </p>

                <p className="text-xl uppercase md:text-3xl">
                  8 semaines d’expédition
                </p>
              </div>

              <div className="flex items-center bg-white px-5 text-5xl font-black text-black md:px-8 md:text-7xl">
                »
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FATALITÉ */}
      <section className="relative overflow-hidden bg-[#E3F3FE] bg-[linear-gradient(#bde2ee_1px,transparent_1px),linear-gradient(90deg,#bde2ee_1px,transparent_1px)] bg-[size:64px_64px] px-5 py-20 md:px-24 md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E3F3FE] blur-3xl md:h-[900px] md:w-[900px]" />

        <div className="relative z-10 w-full">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
            <div className="mb-6 flex justify-center gap-3">
              <span className="flex h-24 w-24 items-center justify-center border border-black bg-white px-3 text-center text-sm font-button uppercase leading-none md:h-auto md:w-auto md:px-4 md:py-1">
                Le corps est prêt
              </span>

              <span className="flex h-24 w-24 items-center justify-center border border-black bg-black px-3 text-center text-sm font-button uppercase leading-none text-white md:h-auto md:w-auto md:px-4 md:py-1">
                Le mental est d’acier
              </span>
            </div>

            <p className="font-title text-[46px] uppercase leading-[0.9] tracking-[-0.05em] md:text-[56px]">
              Soyez le dernier rempart
            </p>

            <h2 className="mt-4 font-title text-center text-[34px] uppercase leading-[0.9] tracking-[-0.06em] md:whitespace-nowrap md:text-[6.5vw]">
              Contre la fatalité
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-[900px] text-center">
            <p className="text-[18px] leading-[1.55] md:text-[24px] md:leading-[1.6]">
              <strong>Seul le financement fait encore barrage.</strong>{" "}
              Fabienne a toujours financé ses expéditions elle-même et reversé
              ses dons à la recherche.
              <br />
              Aujourd’hui, pour cette étape ultime et la plus coûteuse, elle a{" "}
              <strong>besoin de vous.</strong>
            </p>

            <p className="mt-8 text-[18px] italic leading-[1.6] md:mt-10 md:text-[24px] md:leading-[1.7]">
              Soutenir <strong>"Le Piolet de Verre"</strong>, c’est s’associer
              à une aventure humaine qui refuse la fatalité. C’est porter un
              message d’espoir pour chaque personne luttant contre la maladie.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <Image
              src="/images/icon.png"
              alt="Le Piolet de Verre icon"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="bg-white px-5 py-20 md:px-24 md:py-28">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-lg uppercase">Plus qu’une athlète</p>

          <h2 className="mx-auto mt-2 max-w-[340px] text-[44px] font-title leading-[0.9] tracking-[-0.05em] md:max-w-none md:text-[64px]">
            Ses engagements
          </h2>

          <div className="mt-12 grid gap-10 text-left md:mt-16 md:grid-cols-3 md:gap-8">
            {[
              [
                images.engagement1,
                <HeartPulse key="heart" size={24} />,
                "CHU Montpellier",
                "Engagement quotidien auprès des patients.",
                "scale-110 object-[center_65%]",
              ],
              [
                images.engagement2,
                <Mountain key="mountain" size={24} />,
                "Le Piolet de Verre",
                "Conférencière, évènements, soutien aux sportifs en situation de handicap.",
                "scale-175 object-[center_45%]",
              ],
              [
                images.engagement3,
                <ShieldCheck key="shield" size={24} />,
                "Accompagnement",
                "Préparation mentale, soutien individuel.",
                "scale-110 object-[center_40%]",
              ],
            ].map(([img, icon, title, text, imageClassName]) => (
              <article key={String(title)}>
                <Img
                  src={String(img)}
                  alt=""
                  className="h-[230px]"
                  imageClassName={String(imageClassName)}
                />

                <div className="mt-8 flex items-center gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black">
                    {icon}
                  </div>

                  <h3 className="text-2xl font-title uppercase">{title}</h3>
                </div>

                <p className="mt-5 max-w-xs leading-tight">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-20 border-t border-black" />
        </div>
      </section>

      {/* IMPACT + FOOTER */}
      <section className="bg-white px-5 pt-16 md:px-24 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
          <div>
            <p className="text-lg uppercase">En toute transparence</p>

            <h2 className="mt-2 text-[48px] font-title leading-[0.9] tracking-[-0.05em] md:text-[46px]">
              Votre impact
              <br />
              en haute altitude
            </h2>

            <p className="mt-10 max-w-md text-lg leading-tight">
              <strong>20% du budget</strong> est déjà sécurisé grâce à
              l’investissement personnel de Fabienne et ses premiers
              partenaires.
            </p>

            <p className="mt-8 max-w-md text-lg font-black leading-tight">
              Les 50 000 € restants sont le prix de sa sécurité.
            </p>

            <Img src={images.impact} alt="" className="mt-16 h-[230px]" />

            <div className="mt-8 grid gap-4 md:flex md:flex-wrap">
              <a href={DONATION_URL} target="_blank" rel="noopener noreferrer">
                <Button dark full>
                  Faire un don
                </Button>
              </a>

              <Button full onClick={() => setIsPopupOpen(true)}>
                Soutenir en tant qu’entreprise
              </Button>
            </div>
          </div>

          <div>
            {[
              [
                <Truck key="truck" size={28} />,
                "Logistique critique",
                "Camp de base, transport et permis officiels pour le voyage.",
                images.logistique,
              ],
              [
                <ShieldCheck key="shield" size={28} />,
                "Sécurité vitale",
                "Oxygène, masques et équipements techniques haute altitude.",
                images.securite,
              ],
              [
                <Mountain key="mountain" size={28} />,
                "L’expertise",
                "Encadrement par un guide, personnel et équipe sur site.",
                images.expertise,
              ],
            ].map(([icon, title, text, img]) => (
              <div
                key={String(title)}
                className="grid grid-cols-1 gap-6 border-b border-black py-8 md:grid-cols-[1fr_120px] md:gap-8"
              >
                <div>
                  <h3 className="flex items-center gap-4 text-2xl font-title md:text-3xl">
                    <span>{icon}</span>
                    {title}
                  </h3>

                  <p className="mt-6 max-w-sm text-base leading-tight text-black/40 md:mt-10 md:text-lg">
                    {text}
                  </p>
                </div>

                <Img src={String(img)} alt="" className="h-[160px] md:h-[120px]" />
              </div>
            ))}
          </div>
        </div>

        <footer className="relative left-1/2 mt-24 w-screen -translate-x-1/2 bg-black px-5 py-16 text-white md:px-24 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
              <div>
                <div className="font-title text-2xl uppercase">
                  Le Piolet de Verre
                </div>

                <h3 className="mt-10 font-title text-2xl uppercase leading-tight">
                  Rejoignez-nous.
                  <br />
                  <span className="font-subtitle text-xl">
                    Portons ce message au sommet
                  </span>
                </h3>

                <p className="mt-10 text-xs">
                  Contactez directement : clara@you-and.fr / + 33 6 64 49 24 66 <br />
                  Crédits images : les visuels utilisés proviennent de Wikipédia.
                </p>



                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                >
                  <FaInstagram size={18} />
                  Suivre Fabienne Sicot-Personnic
                </a>
              </div>

              <div className="flex flex-col items-start justify-start md:items-end">
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="border-2 border-white bg-black px-6 py-4 text-sm font-button uppercase text-white transition hover:bg-white hover:text-black md:px-10 md:py-5 md:text-base"
                >
                  Soutenir en tant qu’entreprise →
                </button>

                <p className="mt-5 text-sm text-white/80 md:text-right">
                  Dons éligibles à une réduction d'impôt (Reçu fiscal).
                </p>
              </div>
            </div>

            <div className="mt-16 border-t border-white/40 pt-8 text-xs text-white/70">
              © 2026 LE PIOLET DE VERRE | Design by embraz™
            </div>
          </div>
        </footer>
      </section>
    </main>
  )
}
