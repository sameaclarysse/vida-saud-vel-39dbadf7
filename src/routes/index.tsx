import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Ambulance, Flame, Shield, HeartPulse, MapPin, Hospital, Pill, Building2, Stethoscope,
  MessageCircle, Instagram, Phone, Droplets, Scale, Wind, Lightbulb, Bell, Trash2, Users,
  Plus, HeartHandshake, Minus, ArrowRight, Smartphone, Download, ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vida Saudável – Saúde e Bem-Estar" },
      { name: "description", content: "Encontre postos de saúde, fale com médicos, organize lembretes de remédios e tenha contatos de emergência à mão." },
      { property: "og:title", content: "Vida Saudável – Saúde e Bem-Estar" },
      { property: "og:description", content: "Saúde ao seu alcance: postos, médicos, remédios e emergência em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// ===== CONFIGURAÇÃO: troque pelos números/perfis reais (55 + DDD + número) =====
const HOSPITAL_TEL = "+558632000000";
const HOSPITAL_WA = "558632000000";
const MEDICOS = [
  { nome: "Dra. Ana Souza", esp: "Clínica geral", wa: "558691111111", ig: "dra.anasouza" },
  { nome: "Dr. Carlos Lima", esp: "Cardiologia", wa: "558692222222", ig: "dr.carloslima" },
  { nome: "Dra. Beatriz Rocha", esp: "Pediatria", wa: "558693333333", ig: "dra.beatrizrocha" },
];
const SUS_PLAY = "https://play.google.com/store/apps/details?id=br.gov.datasus.cnsdigital&hl=pt_BR";
const SUS_APPLE = "https://apps.apple.com/br/app/meu-sus-digital/id1045754608";
const SUS_PORTAL = "https://meususdigital.saude.gov.br/";
const DICAS = [
  "Beba água ao longo do dia, mesmo sem sentir sede.",
  "Caminhar 30 minutos por dia ajuda o coração e o humor.",
  "Dormir de 7 a 8 horas renova o corpo e a mente.",
  "Frutas, verduras e legumes devem estar no prato todos os dias.",
  "Lave bem as mãos antes de comer e depois de usar o banheiro.",
  "Proteja-se do sol: use chapéu e protetor solar.",
  "Faça check-ups regulares, mesmo quando se sentir bem.",
  "Conversar com amigos e família faz bem para a saúde mental.",
];

function useStored<T>(key: string, initial: T) {
  const [v, setV] = useState<T>(initial);
  const loaded = useRef(false);
  useEffect(() => {
    try { const r = localStorage.getItem(key); if (r) setV(JSON.parse(r)); } catch { /* */ }
    loaded.current = true;
  }, [key]);
  useEffect(() => {
    if (loaded.current) try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* */ }
  }, [key, v]);
  return [v, setV] as const;
}

const btn = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[.98]";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:bg-primary/90`;
const btnOutline = `${btn} border border-border bg-card text-foreground hover:bg-muted`;
const btnSuccess = `${btn} bg-success text-success-foreground hover:bg-success/90`;
const btnDanger = `${btn} bg-destructive text-destructive-foreground hover:bg-destructive/90`;
const inputCls = "w-full flex-1 min-w-[140px] rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
const cardCls = "rounded-2xl border border-border bg-card p-6 shadow-card";
const storeBtn = "inline-flex items-center justify-center gap-2 rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/70 active:scale-[.98]";

function Section({ id, eyebrow, title, desc, children }: { id: string; eyebrow: string; title: string; desc: string; children: ReactNode }) {
  return (
    <section id={id} className="py-12 md:py-16">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">{desc}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function IconBadge({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "accent" | "destructive" }) {
  const t = { primary: "bg-primary-soft text-primary", accent: "bg-accent-soft text-accent", destructive: "bg-destructive-soft text-destructive" }[tone];
  return <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${t}`}>{children}</div>;
}

function Index() {
  const [fs, setFs] = useStored("tam", 17);
  useEffect(() => { document.documentElement.style.setProperty("--fs", fs + "px"); }, [fs]);
  const [saud, setSaud] = useState("Olá");
  useEffect(() => { const h = new Date().getHours(); setSaud(h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite"); }, []);

  const nav = [["postos", "Postos"], ["medicos", "Médicos"], ["hospital", "Hospital"], ["bem", "Bem-estar"], ["remedios", "Remédios"], ["familia", "Família"], ["sus", "SUS Digital"]];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"><HeartPulse className="h-5 w-5" /></span>
            <span className="font-display text-lg font-semibold text-foreground">Vida Saudável</span>
          </a>
          <nav className="hidden gap-1 lg:flex">
            {nav.map(([id, l]) => <a key={id} href={`#${id}`} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">{l}</a>)}
          </nav>
          <div className="flex items-center gap-1" aria-label="Tamanho da letra">
            <button onClick={() => setFs(Math.max(14, fs - 1))} aria-label="Diminuir letra" className={`${btnOutline} h-9 w-9 px-0`}><Minus className="h-4 w-4" /></button>
            <span className="px-1 text-xs font-semibold text-muted-foreground">Aa</span>
            <button onClick={() => setFs(Math.min(24, fs + 1))} aria-label="Aumentar letra" className={`${btnOutline} h-9 w-9 px-0`}><Plus className="h-4 w-4" /></button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-2 lg:hidden">
          {nav.map(([id, l]) => <a key={id} href={`#${id}`} className="shrink-0 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-secondary-foreground">{l}</a>)}
        </nav>
      </header>

      <div className="bg-hero text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] opacity-80">{saud}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-6xl">Cuidar de você é o nosso compromisso!</h1>
            <p className="mt-5 max-w-xl text-lg opacity-85">Encontre postos de saúde, fale com médicos, receba lembretes dos seus remédios e tenha contatos de emergência sempre à mão.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:192" className={`${btnDanger} px-6 py-3.5 text-base`}><Ambulance className="h-5 w-5" /> Emergência: ligar 192</a>
              <a href="#postos" className={`${btn} border border-primary-foreground/30 px-6 py-3.5 text-base hover:bg-primary-foreground/10`}>Encontrar atendimento <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-center">
            {[["192", "SAMU", Ambulance], ["193", "Bombeiros", Flame], ["190", "Polícia", Shield], ["136", "Disque Saúde", Phone]].map(([n, l, I]) => {
              const Icon = I as typeof Ambulance;
              return (
                <a key={n as string} href={`tel:${n}`} className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 backdrop-blur transition hover:bg-primary-foreground/20">
                  <Icon className="h-5 w-5 opacity-80" />
                  <div className="mt-3 font-display text-3xl font-semibold">{n as string}</div>
                  <div className="text-sm opacity-80">{l as string}</div>
                </a>
              );
            })}
            <p className="col-span-2 text-center text-xs opacity-70">Toque para ligar · ligação gratuita</p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl divide-y divide-border px-5">
        <Postos />
        <Section id="medicos" eyebrow="Atendimento" title="Fale com um médico" desc="Escolha a forma mais fácil para você: WhatsApp ou Direct do Instagram.">
          <div className="grid gap-5 md:grid-cols-3">
            {MEDICOS.map((m) => (
              <div key={m.nome} className={cardCls}>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft font-display text-lg font-semibold text-primary">{m.nome.split(" ").slice(1).map((w) => w.charAt(0)).join("")}</div>
                  <div><h3 className="font-semibold text-foreground">{m.nome}</h3><p className="text-sm text-muted-foreground">{m.esp}</p></div>
                </div>
                <div className="mt-5 flex gap-2">
                  <a className={`${btnSuccess} flex-1`} target="_blank" rel="noopener" href={`https://wa.me/${m.wa}?text=${encodeURIComponent("Olá, gostaria de uma orientação.")}`}><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                  <a className={`${btnOutline} flex-1`} target="_blank" rel="noopener" href={`https://ig.me/m/${m.ig}`}><Instagram className="h-4 w-4" /> Direct</a>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section id="hospital" eyebrow="Hospital" title="Contato direto com o hospital" desc="Fale com a equipe do hospital a qualquer hora.">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { t: "Emergência 24h", d: "Atendimento imediato.", i: <Ambulance className="h-5 w-5" />, tone: "destructive" as const, a: <a className={btnDanger} href="tel:192"><Phone className="h-4 w-4" /> Ligar 192</a> },
              { t: "Recepção", d: "Informações, visitas e consultas.", i: <Building2 className="h-5 w-5" />, tone: "primary" as const, a: <a className={btnPrimary} href={`tel:${HOSPITAL_TEL}`}><Phone className="h-4 w-4" /> Ligar</a> },
              { t: "WhatsApp do hospital", d: "Converse com a equipe por mensagem.", i: <MessageCircle className="h-5 w-5" />, tone: "accent" as const, a: <a className={btnSuccess} target="_blank" rel="noopener" href={`https://wa.me/${HOSPITAL_WA}?text=${encodeURIComponent("Olá, preciso de informações.")}`}><MessageCircle className="h-4 w-4" /> Conversar</a> },
            ].map((c) => (
              <div key={c.t} className={cardCls}>
                <IconBadge tone={c.tone}>{c.i}</IconBadge>
                <h3 className="mt-4 font-semibold text-foreground">{c.t}</h3>
                <p className="mb-5 mt-1 text-sm text-muted-foreground">{c.d}</p>
                {c.a}
              </div>
            ))}
          </div>
        </Section>
        <BemEstar />
        <Remedios />
        <Familia />
        <SusDigital />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <div className="flex items-center gap-2"><HeartPulse className="h-4 w-4 text-primary" /> Projeto Integrador – Saúde e Bem-Estar</div>
          <div>Em caso de emergência, ligue 192. Este site não substitui atendimento médico.</div>
        </div>
      </footer>
    </div>
  );
}

function Postos() {
  const [msg, setMsg] = useState("");
  const perto = (q: string) => {
    const base = "https://www.google.com/maps/search/" + encodeURIComponent(q + " perto de mim");
    if (!navigator.geolocation) { window.open(base, "_blank"); return; }
    setMsg("Buscando sua localização…");
    navigator.geolocation.getCurrentPosition(
      (p) => { setMsg("Abrindo o mapa…"); window.open(`https://www.google.com/maps/search/${encodeURIComponent(q)}/@${p.coords.latitude},${p.coords.longitude},15z`, "_blank"); },
      () => { setMsg("Não foi possível usar sua localização. Abrindo busca geral."); window.open(base, "_blank"); },
      { timeout: 8000 },
    );
  };
  const items = [
    ["posto de saúde", "Postos de saúde", "Unidades básicas (UBS)", Stethoscope],
    ["UPA pronto atendimento", "UPA", "Pronto atendimento 24h", Ambulance],
    ["hospital", "Hospitais", "Atendimento completo", Hospital],
    ["farmácia", "Farmácias", "Remédios e orientação", Pill],
  ] as const;
  return (
    <Section id="postos" eyebrow="Perto de você" title="Encontre atendimento próximo" desc="Usamos sua localização para abrir o mapa com as unidades mais próximas.">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map(([q, t, d, I]) => (
          <button key={q} onClick={() => perto(q)} className={`${cardCls} group text-left transition hover:-translate-y-0.5 hover:border-primary`}>
            <IconBadge><I className="h-5 w-5" /></IconBadge>
            <h3 className="mt-4 font-semibold text-foreground">{t}</h3>
            <p className="text-sm text-muted-foreground">{d}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"><MapPin className="h-4 w-4" /> Ver no mapa</span>
          </button>
        ))}
      </div>
      {msg && <p className="mt-4 text-sm text-muted-foreground" role="status">{msg}</p>}
    </Section>
  );
}

function BemEstar() {
  const [agua, setAgua] = useStored<{ d: string; n: number }>("agua", { d: "", n: 0 });
  const [hoje, setHoje] = useState("");
  useEffect(() => setHoje(new Date().toDateString()), []);
  const n = agua.d === hoje ? agua.n : 0;
  const [peso, setPeso] = useState(""); const [alt, setAlt] = useState(""); const [imcR, setImcR] = useState("");
  const [ar, setAr] = useState(false); const [fase, setFase] = useState("Inspire…");
  useEffect(() => { if (!ar) return; setFase("Inspire…"); const t = setInterval(() => setFase((f) => (f === "Inspire…" ? "Solte o ar…" : "Inspire…")), 4000); return () => clearInterval(t); }, [ar]);
  const [di, setDi] = useState(0);
  const imc = () => {
    const p = parseFloat(peso), h = parseFloat(alt) / 100;
    if (!(p > 0) || !(h > 0.5)) { setImcR("Digite peso e altura válidos."); return; }
    const v = p / (h * h);
    const c = v < 18.5 ? "Abaixo do peso" : v < 25 ? "Peso normal" : v < 30 ? "Sobrepeso" : "Obesidade";
    setImcR(`IMC ${v.toFixed(1).replace(".", ",")} – ${c}. Converse com um profissional de saúde para orientação.`);
  };
  return (
    <Section id="bem" eyebrow="Bem-estar" title="Seu cuidado de hoje" desc="Pequenos hábitos fazem muita diferença.">
      <div className="grid gap-5 md:grid-cols-2">
        <div className={cardCls}>
          <div className="flex items-center gap-3"><IconBadge><Droplets className="h-5 w-5" /></IconBadge><h3 className="font-semibold text-foreground">Água de hoje</h3></div>
          <div className="mt-5 flex flex-wrap gap-2">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
              <button key={i} aria-label={`Copo ${i}`} onClick={() => setAgua({ d: hoje, n: n === i ? i - 1 : i })}
                className={`flex h-11 w-11 items-center justify-center rounded-lg border transition ${i <= n ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted text-muted-foreground hover:border-primary"}`}>
                <Droplets className="h-5 w-5" />
              </button>
            ))}
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(n / 8) * 100}%` }} /></div>
          <p className="mt-3 text-sm text-muted-foreground">{n >= 8 ? "Parabéns! Meta de hoje concluída." : `${n} de 8 copos · faltam ${8 - n}`}</p>
        </div>
        <div className={cardCls}>
          <div className="flex items-center gap-3"><IconBadge tone="accent"><Scale className="h-5 w-5" /></IconBadge><h3 className="font-semibold text-foreground">Calculadora de IMC</h3></div>
          <div className="mt-5 flex gap-2">
            <input className={inputCls} type="number" inputMode="decimal" placeholder="Peso (kg)" aria-label="Peso em kg" value={peso} onChange={(e) => setPeso(e.target.value)} />
            <input className={inputCls} type="number" inputMode="numeric" placeholder="Altura (cm)" aria-label="Altura em cm" value={alt} onChange={(e) => setAlt(e.target.value)} />
          </div>
          <button className={`${btnPrimary} mt-3`} onClick={imc}>Calcular</button>
          {imcR && <p className="mt-3 rounded-lg bg-muted p-3 text-sm text-foreground">{imcR}</p>}
        </div>
        <div className={`${cardCls} text-center`}>
          <div className="flex items-center gap-3 text-left"><IconBadge tone="accent"><Wind className="h-5 w-5" /></IconBadge><h3 className="font-semibold text-foreground">Respiração calma</h3></div>
          <div className="my-6 flex h-36 items-center justify-center">
            <div className={`flex h-32 w-32 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent ring-8 ring-accent-soft/50 ${ar ? "animate-breathe" : ""}`}>{ar ? fase : "Pronto?"}</div>
          </div>
          <button className={ar ? btnOutline : btnPrimary} onClick={() => setAr(!ar)}>{ar ? "Parar" : "Iniciar exercício"}</button>
        </div>
        <div className={cardCls}>
          <div className="flex items-center gap-3"><IconBadge><Lightbulb className="h-5 w-5" /></IconBadge><h3 className="font-semibold text-foreground">Dica de saúde</h3></div>
          <p className="mt-5 min-h-[4.5em] font-display text-xl leading-snug text-foreground">“{DICAS[di]}”</p>
          <button className={btnOutline} onClick={() => setDi((di + 1) % DICAS.length)}>Nova dica</button>
        </div>
      </div>
    </Section>
  );
}

function pedir() { try { if ("Notification" in window && Notification.permission === "default") Notification.requestPermission(); } catch { /* */ } }
function beep() {
  try {
    const W = window as unknown as { AudioContext: typeof AudioContext; webkitAudioContext: typeof AudioContext };
    const c = new (W.AudioContext || W.webkitAudioContext)(); let n = 0;
    const t = () => { if (n++ > 5) return; const o = c.createOscillator(); o.frequency.value = 880; o.connect(c.destination); o.start(); setTimeout(() => { o.stop(); setTimeout(t, 250); }, 300); };
    t();
  } catch { /* */ }
}

function Remedios() {
  const [rems, setRems] = useStored<{ n: string; h: string }[]>("rems", []);
  const [nome, setNome] = useState(""); const [hora, setHora] = useState("");
  const [alerta, setAlerta] = useState<{ n: string; h: string } | null>(null);
  const feitos = useRef<Record<string, 1>>({});
  useEffect(() => {
    const checar = () => {
      const d = new Date(); const h = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      rems.forEach((r) => {
        const k = d.toDateString() + r.h + r.n;
        if (r.h === h && !feitos.current[k]) {
          feitos.current[k] = 1; setAlerta(r); beep();
          try { if ("Notification" in window && Notification.permission === "granted") new Notification("Hora do remédio", { body: `${r.n} – ${r.h}` }); } catch { /* */ }
        }
      });
    };
    const t = setInterval(checar, 15000); return () => clearInterval(t);
  }, [rems]);
  return (
    <Section id="remedios" eyebrow="Lembretes" title="Lembrete de remédios" desc="Cadastre o remédio e o horário. Um alarme avisa você na hora certa (mantenha esta página aberta).">
      <div className={cardCls}>
        <form className="flex flex-wrap gap-3" onSubmit={(e) => { e.preventDefault(); setRems([...rems, { n: nome.trim(), h: hora }].sort((a, b) => (a.h < b.h ? -1 : 1))); setNome(""); setHora(""); pedir(); }}>
          <input className={inputCls} placeholder="Nome do remédio" required aria-label="Nome do remédio" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input className={`${inputCls} max-w-[160px]`} type="time" required aria-label="Horário" value={hora} onChange={(e) => setHora(e.target.value)} />
          <button className={btnPrimary} type="submit"><Plus className="h-4 w-4" /> Adicionar</button>
          <button type="button" className={btnOutline} onClick={pedir}><Bell className="h-4 w-4" /> Ativar notificações</button>
        </form>
        <ul className="mt-5 divide-y divide-border">
          {rems.length ? rems.map((r, i) => (
            <li key={i} className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-3"><IconBadge tone="accent"><Pill className="h-5 w-5" /></IconBadge><div><div className="font-semibold text-foreground">{r.n}</div><div className="text-sm text-muted-foreground">Todos os dias às {r.h}</div></div></div>
              <button className={`${btnOutline} h-9 w-9 px-0`} aria-label="Apagar" onClick={() => setRems(rems.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></button>
            </li>
          )) : <li className="py-6 text-center text-sm text-muted-foreground">Nenhum lembrete cadastrado.</li>}
        </ul>
      </div>
      {alerta && (
        <div role="alert" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl bg-destructive p-5 text-center text-destructive-foreground shadow-card">
          <Pill className="mx-auto h-6 w-6" />
          <p className="mt-2 font-display text-xl font-semibold">Hora do remédio!</p>
          <p className="opacity-90">{alerta.n} – {alerta.h}</p>
          <button className={`${btn} mt-4 bg-card text-foreground`} onClick={() => setAlerta(null)}>Já tomei</button>
        </div>
      )}
    </Section>
  );
}

function Familia() {
  const [fam, setFam] = useStored<{ n: string; t: string }[]>("fam", []);
  const [nome, setNome] = useState(""); const [tel, setTel] = useState("");
  return (
    <Section id="familia" eyebrow="Rede de apoio" title="Contatos de família e emergência" desc="Salve pessoas de confiança para ligar rápido em qualquer situação.">
      <div className={cardCls}>
        <form className="flex flex-wrap gap-3" onSubmit={(e) => { e.preventDefault(); setFam([...fam, { n: nome.trim(), t: tel.trim() }]); setNome(""); setTel(""); }}>
          <input className={inputCls} placeholder="Nome (ex.: Maria, filha)" required aria-label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input className={inputCls} type="tel" placeholder="Telefone com DDD" required aria-label="Telefone" value={tel} onChange={(e) => setTel(e.target.value)} />
          <button className={btnPrimary} type="submit"><Plus className="h-4 w-4" /> Salvar</button>
        </form>
        <ul className="mt-5 divide-y divide-border">
          {fam.length ? fam.map((f, i) => {
            let n = f.t.replace(/\D/g, ""); if (n.length <= 11) n = "55" + n;
            return (
              <li key={i} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3"><IconBadge><Users className="h-5 w-5" /></IconBadge><div><div className="font-semibold text-foreground">{f.n}</div><div className="text-sm text-muted-foreground">{f.t}</div></div></div>
                <div className="flex gap-2">
                  <a className={btnPrimary} href={`tel:+${n}`}><Phone className="h-4 w-4" /> Ligar</a>
                  <a className={`${btnSuccess} w-10 px-0`} aria-label="WhatsApp" target="_blank" rel="noopener" href={`https://wa.me/${n}`}><MessageCircle className="h-4 w-4" /></a>
                  <button className={`${btnOutline} w-10 px-0`} aria-label="Apagar" onClick={() => setFam(fam.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            );
          }) : <li className="flex flex-col items-center gap-2 py-6 text-sm text-muted-foreground"><HeartHandshake className="h-6 w-6" /> Nenhum contato salvo ainda.</li>}
        </ul>
      </div>
    </Section>
  );
}

function SusDigital() {
  const itens = [
    ["Vacinação", "Caderneta digital e certificado de vacinação."],
    ["Exames e atendimentos", "Resultados e histórico do que foi feito no SUS."],
    ["Medicamentos", "Remédios do Farmácia Popular e da sua lista."],
    ["Fila e agendamentos", "Transplantes, consultas e serviços perto de você."],
  ];
  return (
    <section id="sus" className="py-12 md:py-16">
      <div className="overflow-hidden rounded-3xl bg-hero text-primary-foreground shadow-card">
        <div className="grid gap-10 p-7 md:grid-cols-[1.15fr_1fr] md:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] opacity-80">Serviço oficial do governo</p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">App Meu SUS Digital</h2>
            <p className="mt-3 max-w-xl opacity-85">
              O aplicativo oficial do Ministério da Saúde, antigo Conecte SUS, guarda no celular suas vacinas,
              exames, atendimentos e medicamentos. É gratuito e só precisa de uma conta gov.br.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className={storeBtn} href={SUS_PLAY} target="_blank" rel="noopener"><Download className="h-4 w-4" /> Baixar no Google Play</a>
              <a className={storeBtn} href={SUS_APPLE} target="_blank" rel="noopener"><Smartphone className="h-4 w-4" /> Baixar na App Store</a>
              <a className={storeBtn} href={SUS_PORTAL} target="_blank" rel="noopener"><ExternalLink className="h-4 w-4" /> Usar pelo navegador</a>
            </div>
            <p className="mt-4 text-xs opacity-70">
              Os botões abrem a página oficial do app. Nada é cadastrado aqui neste site.
            </p>
          </div>
          <ul className="grid gap-3 self-center sm:grid-cols-2">
            {itens.map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 backdrop-blur">
                <div className="font-semibold">{t}</div>
                <p className="mt-1 text-sm opacity-80">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
