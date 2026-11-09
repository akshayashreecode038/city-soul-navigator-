import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronLeft,
  Compass,
  Heart,
  Layers3,
  Map as MapIcon,
  MapPin,
  MessageCircle,
  Navigation,
  Search,
  Send,
  Sparkles,
  Star,
  Sun,
  Users,
  UserRound,
  Waves,
  Wind,
  X,
} from "lucide-react";

type Mode = "map" | "explore" | "memories" | "community" | "profile";
type Marker = { name: string; detail: string; x: string; y: string; tone: string; icon: typeof MapPin };

const markers: Marker[] = [
  { name: "Riverside Walk", detail: "340 m · shade + water", x: "41%", y: "17%", tone: "#69a996", icon: Waves },
  { name: "Local Café", detail: "180 m · warm + social", x: "17%", y: "29%", tone: "#d19467", icon: Sun },
  { name: "City Library", detail: "270 m · quiet inside", x: "69%", y: "28%", tone: "#7498bf", icon: Bookmark },
  { name: "Art Mural", detail: "90 m · curious energy", x: "43%", y: "37%", tone: "#a58aca", icon: Sparkles },
  { name: "Community Park", detail: "160 m · green + open", x: "77%", y: "42%", tone: "#72a968", icon: Wind },
  { name: "Quiet Street", detail: "120 m · low traffic", x: "20%", y: "62%", tone: "#589994", icon: MapPin },
  { name: "Night Market", detail: "300 m · lively after 6", x: "72%", y: "67%", tone: "#a57cc2", icon: Star },
  { name: "Sunset Point", detail: "380 m · golden hour", x: "77%", y: "83%", tone: "#d39b59", icon: Sun },
];

const preferences = [
  { label: "Quiet", icon: Wind, color: "#5d9c93" },
  { label: "Scenic", icon: Sun, color: "#d49b5d" },
  { label: "Local spots", icon: Star, color: "#a278bc" },
  { label: "Shaded", icon: Waves, color: "#6287b2" },
  { label: "Accessible", icon: Navigation, color: "#778e6e" },
  { label: "People around", icon: Users, color: "#c77b7f" },
];

function MarkerCard({ marker, active, onClick }: { marker: Marker; active: boolean; onClick: () => void }) {
  const Icon = marker.icon;
  return (
    <button onClick={onClick} className="absolute z-20 flex items-center gap-2 rounded-2xl border border-white/80 px-2 py-2 text-left shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1" style={{ left: marker.x, top: marker.y, background: `${marker.tone}e8`, transform: active ? "scale(1.06)" : undefined }}>
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/85" style={{ color: marker.tone }}><Icon size={16} /></span>
      <span className="pr-1"><span className="block whitespace-nowrap text-[11px] font-bold text-white">{marker.name}</span><span className="block whitespace-nowrap text-[9px] text-white/80">{marker.detail}</span></span>
    </button>
  );
}

function Header({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 md:px-8">
      <button onClick={() => setMode("map")} className="flex items-center gap-3 text-left">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e7f4ee] text-[#327e71] shadow-sm"><Compass size={22} /></span>
        <span><span className="block font-['Plus_Jakarta_Sans'] text-sm font-extrabold tracking-tight text-[#193d3a]">wayfinder</span><span className="block text-[9px] uppercase tracking-[0.2em] text-[#6e8981]">human navigation</span></span>
      </button>
      <div className="hidden items-center gap-1 rounded-full border border-white/80 bg-[#f8fcf6]/85 p-1 shadow-sm backdrop-blur md:flex">
        {(["map", "explore", "memories", "community"] as Mode[]).map((item) => <button key={item} onClick={() => setMode(item)} className={`rounded-full px-4 py-2 text-[11px] font-bold capitalize transition ${mode === item ? "bg-[#244d49] text-white" : "text-[#56716b] hover:bg-[#e6f2ea]"}`}>{item}</button>)}
      </div>
      <button onClick={() => setMode("profile")} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#d8eee1] text-[#367c6c] shadow-md"><UserRound size={19} /></button>
    </header>
  );
}

export function HumanNavigation() {
  const [mode, setMode] = useState<Mode>("map");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Riverside Walk");
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<string[]>(["Quiet", "Scenic"]);
  const [contributed, setContributed] = useState(false);
  const [toast, setToast] = useState("");
  const filtered = useMemo(() => markers.filter((m) => m.name.toLowerCase().includes(query.toLowerCase())), [query]);
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2200); };
  const togglePref = (label: string) => setPrefs((p) => p.includes(label) ? p.filter((v) => v !== label) : [...p, label]);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#e4efe7] font-['Plus_Jakarta_Sans'] text-[#193d3a]">
      <style>{`
        @keyframes drift { from { transform: translateY(0) } 50% { transform: translateY(-5px) } to { transform: translateY(0) } }
        @keyframes pulseRing { from { transform:scale(.9);opacity:.65 } to { transform:scale(1.4);opacity:0 } }
        .floaty { animation: drift 5s ease-in-out infinite; } .routeLine { stroke-dasharray: 8 10; animation: dash 12s linear infinite; } @keyframes dash { to { stroke-dashoffset:-120 } }
      `}</style>
      <Header mode={mode} setMode={setMode} />

      {mode === "map" && <section className="relative min-h-[100dvh]">
        <img src="/__mockup/images/human-navigation-reference.png" alt="Aerial view of Demo City" className="absolute inset-0 h-full w-full object-cover object-center opacity-70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(236,248,239,.92)_0%,rgba(217,238,224,.18)_32%,rgba(20,65,58,.18)_100%)]" />
        <div className="absolute left-5 top-28 z-30 max-w-xs md:left-10 md:top-32"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#47796d]">Tuesday · 4:18 PM · Demo City</p><h1 className="font-['Fraunces'] text-4xl leading-[.95] tracking-tight text-[#1c514b] md:text-6xl">Where do you<br /><i>want to feel?</i></h1></div>
        <div className="absolute right-5 top-24 z-30 flex flex-col gap-2 md:right-8 md:top-32">
          <label className="flex w-52 items-center gap-2 rounded-2xl border border-white bg-[#fbfffa]/95 px-3 py-3 shadow-xl"><Search size={16} className="text-[#649087]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a place or feeling" className="w-full bg-transparent text-xs outline-none placeholder:text-[#7c9690]" /></label>
          {query && <div className="rounded-2xl bg-[#fbfffa]/95 p-2 shadow-xl">{filtered.map((m) => <button key={m.name} onClick={() => { setActive(m.name); setQuery(""); }} className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs hover:bg-[#e6f2ea]"><MapPin size={13} style={{ color: m.tone }} />{m.name}</button>)}</div>}
        </div>
        <div className="absolute right-4 top-[40%] z-20 hidden flex-col rounded-2xl border border-white bg-[#f8fdf8]/90 p-1 shadow-xl backdrop-blur sm:flex"><button className="p-3 text-[#39776c]"><Layers3 size={17} /></button><button className="border-t border-[#d9e9df] p-3 text-[#39776c]"><Navigation size={17} /></button></div>
        <div className="absolute inset-x-0 bottom-0 top-0">
          {markers.map((marker, i) => <MarkerCard key={marker.name} marker={marker} active={active === marker.name} onClick={() => setActive(marker.name)} />)}
          <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M50 88 C 48 73, 35 70, 42 58 S 53 42, 41 18" fill="none" stroke="#f5faf2" strokeWidth="0.55" className="routeLine" /></svg>
          <div className="absolute bottom-[18%] left-[47%] z-30"><div className="absolute -inset-5 rounded-full border-2 border-white/70" style={{ animation: "pulseRing 2.2s infinite" }} /><div className="relative h-9 w-9 rounded-full border-4 border-white bg-[#2e8275] shadow-lg" /></div>
        </div>
        <div className="absolute bottom-20 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-[24px] border border-white/70 bg-[#f8fff9]/95 p-4 shadow-2xl backdrop-blur md:bottom-8">
          <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#6a8980]">Your current mood</p><p className="mt-1 font-['Fraunces'] text-xl text-[#21554d]">A little space to think</p></div><button onClick={() => setShowPrefs(true)} className="flex items-center gap-1 rounded-xl bg-[#e2f2e6] px-3 py-2 text-[10px] font-bold text-[#397b6b]">Change <ArrowRight size={13} /></button></div>
          <div className="mt-3 flex items-center justify-between gap-2"><span className="text-[11px] text-[#6a8980]">{prefs.length} preferences shaping your route</span><button onClick={() => setShowPrefs(true)} className="rounded-xl bg-[#244d49] px-4 py-2.5 text-[11px] font-bold text-white shadow-md transition hover:bg-[#327e71]">Plan a human route</button></div>
        </div>
      </section>}

      {mode !== "map" && <section className="min-h-[100dvh] bg-[#f5fbf5] px-5 pb-28 pt-28 md:px-12 md:pt-32">
        <div className="mx-auto max-w-5xl">
          <button onClick={() => setMode("map")} className="mb-7 flex items-center gap-1 text-xs font-bold text-[#5f8278]"><ChevronLeft size={15} /> Back to map</button>
          {mode === "explore" && <><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6d9687]">Explore nearby</p><h2 className="mt-2 font-['Fraunces'] text-5xl text-[#20534b]">The city has<br /><i>small invitations.</i></h2><div className="mt-10 grid gap-4 md:grid-cols-3">{markers.slice(0, 6).map((m, i) => <button key={m.name} onClick={() => { setActive(m.name); notify(`${m.name} is now on your map`); }} className="group overflow-hidden rounded-3xl border border-[#d7e8db] bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="mb-8 flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: `${m.tone}22`, color: m.tone }}><m.icon size={21} /></span><span className="text-[10px] font-bold text-[#83a096]">0.{i + 2} km</span></div><h3 className="font-['Fraunces'] text-2xl text-[#285850]">{m.name}</h3><p className="mt-1 text-xs text-[#78938a]">{m.detail}</p><span className="mt-5 flex items-center gap-1 text-[10px] font-bold text-[#398476]">View place <ArrowRight size={13} className="transition group-hover:translate-x-1" /></span></button>)}</div></>}
          {mode === "memories" && <><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a07386]">Your memory atlas</p><h2 className="mt-2 font-['Fraunces'] text-5xl text-[#533b4a]">Places that<br /><i>hold a little you.</i></h2><div className="mt-10 grid gap-4 md:grid-cols-[1.4fr_1fr]"><div className="rounded-[32px] bg-[#d9eee0] p-7"><Heart className="mb-16 text-[#c16e7d]" fill="currentColor" /><p className="text-xs font-bold uppercase tracking-widest text-[#548073]">Last saved · 12 May</p><h3 className="mt-2 font-['Fraunces'] text-4xl text-[#265a51]">Sunset Point</h3><p className="mt-3 max-w-sm text-sm leading-6 text-[#618378]">“The sky went peach, and the whole city slowed down with me.”</p></div><div className="rounded-[32px] border border-[#e1d8df] bg-[#fffafc] p-7"><MapPin className="mb-16 text-[#a47a94]" /><p className="text-xs font-bold uppercase tracking-widest text-[#a47a94]">Saved places</p><div className="mt-5 space-y-3">{["Quiet Street", "Local Café", "Riverside Walk"].map((x) => <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm text-[#5e716d]" key={x}>{x}<Bookmark size={15} /></div>)}</div></div></div></>}
          {mode === "community" && <><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#bd7e65]">Make the map more human</p><h2 className="mt-2 font-['Fraunces'] text-5xl text-[#684638]">What did this<br /><i>place feel like?</i></h2><div className="mt-10 max-w-2xl rounded-[32px] bg-[#fff7ef] p-7 shadow-sm"><div className="flex items-start gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0d5c0] text-[#a66449]"><MessageCircle size={20} /></span><div><h3 className="font-['Fraunces'] text-2xl text-[#704a3b]">Add a note for fellow wanderers</h3><p className="mt-1 text-xs leading-5 text-[#9d7769]">Share a detail that only someone walking would notice.</p></div></div><textarea placeholder="The light here is..." className="mt-7 h-28 w-full resize-none rounded-2xl border border-[#eedbca] bg-white p-4 text-sm outline-none placeholder:text-[#c9a99a]" /><div className="mt-4 flex items-center justify-between"><span className="text-[10px] text-[#b68a79]">Posting as Mira · Demo City</span><button onClick={() => { setContributed(true); notify("Your story is now part of the map"); }} className="flex items-center gap-2 rounded-xl bg-[#a86449] px-4 py-3 text-xs font-bold text-white">{contributed ? <Check size={15} /> : <Send size={15} />} {contributed ? "Shared with the city" : "Share this feeling"}</button></div></div></>}
          {mode === "profile" && <><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6d9687]">Your wayfinder profile</p><div className="mt-3 flex items-center gap-5"><div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-[#cae6d4] font-['Fraunces'] text-3xl text-[#397568]">M</div><div><h2 className="font-['Fraunces'] text-4xl text-[#20534b]">Mira Chen</h2><p className="text-sm text-[#78938a]">Curious walker · 14 city notes</p></div></div><div className="mt-10 grid max-w-3xl gap-3 md:grid-cols-3">{[["47.2 km", "walked gently"], ["18", "places remembered"], ["6", "stories shared"]].map(([a, b]) => <div className="rounded-3xl border border-[#d7e8db] bg-white p-5" key={b}><p className="font-['Fraunces'] text-3xl text-[#327e71]">{a}</p><p className="mt-1 text-xs text-[#819a91]">{b}</p></div>)}</div><button onClick={() => notify("Preferences are already tuned for you")} className="mt-8 rounded-xl bg-[#244d49] px-5 py-3 text-xs font-bold text-white">Tune my route preferences</button></>}
        </div>
      </section>}

      <nav className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-around rounded-[25px] border border-white/80 bg-[#f8fff9]/95 p-2 shadow-2xl backdrop-blur md:hidden">
        {[["explore", Compass], ["map", MapIcon], ["memories", Bookmark], ["profile", UserRound]].map(([key, Icon]) => <button key={key as string} onClick={() => setMode(key as Mode)} className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-2 text-[9px] font-bold capitalize ${mode === key ? "bg-[#e1f1e5] text-[#327e71]" : "text-[#80968e]"}`}><Icon size={18} />{key as string}</button>)}
      </nav>
      {showPrefs && <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#153c36]/30 p-3 backdrop-blur-sm md:items-center"><div className="w-full max-w-lg rounded-[32px] bg-[#fbfffa] p-6 shadow-2xl md:p-8"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6d9687]">Your route, your rules</p><h2 className="mt-2 font-['Fraunces'] text-4xl text-[#20534b]">How do you want<br /><i>to travel today?</i></h2></div><button onClick={() => setShowPrefs(false)} className="rounded-full bg-[#e8f3eb] p-2 text-[#548278]"><X size={17} /></button></div><div className="mt-7 grid grid-cols-2 gap-2">{preferences.map(({ label, icon: Icon, color }) => <button key={label} onClick={() => togglePref(label)} className={`flex items-center gap-3 rounded-2xl border p-3 text-left text-xs font-bold transition ${prefs.includes(label) ? "border-[#5b9c8c] bg-[#e1f1e5] text-[#347b6d]" : "border-[#dcebe0] text-[#78938a]"}`}><span style={{ color }}><Icon size={17} /></span>{label}{prefs.includes(label) && <Check size={14} className="ml-auto" />}</button>)}</div><div className="mt-7 rounded-2xl bg-[#eef7ef] p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-[#71948a]">A route made for you</p><div className="mt-2 flex items-center justify-between"><span className="font-['Fraunces'] text-2xl text-[#2d665c]">Recommended Human Route</span><span className="text-xs font-bold text-[#5a9385]">+ 8 min</span></div><p className="mt-1 text-xs text-[#759188]">Quiet Street → Riverside Walk → City Library</p></div><button onClick={() => { setShowPrefs(false); notify("Your human route is ready"); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#244d49] py-4 text-xs font-bold text-white shadow-lg">Show my route <ArrowRight size={15} /></button></div></div>}
      {toast && <div className="fixed bottom-24 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#244d49] px-5 py-3 text-xs font-bold text-white shadow-xl md:bottom-7"><Check size={15} />{toast}</div>}
    </main>
  );
}

export default HumanNavigation;