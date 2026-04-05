import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Wrench, Download, Share2, ArrowLeft, GraduationCap, Cpu, Wind, Mail, Phone, MapPin, Zap, Trophy, CircleDashed, Briefcase, X, CheckCircle2, Shield, Settings2 } from 'lucide-react';
import { f1Teams, Team, ResumeData, initialResumeData } from './data';

function App() {
  const [screen, setScreen] = useState(1);
  const [team, setTeam] = useState<Team>(f1Teams[0]);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  return (
    <div className="relative w-full h-screen font-sans selection:bg-white/30 text-white flex flex-col print:h-auto print:text-black print:bg-white">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-700 blur-[120px] bg-center bg-no-repeat print:hidden"
        style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${team.glow} 0%, transparent 60%)` }}
      />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none mix-blend-overlay print:hidden" />

      {/* Main Screens */}
      <main className="relative z-10 flex-1 overflow-hidden print:overflow-visible">
        <AnimatePresence mode="wait">
          {screen === 1 && <Screen1 key="s1" team={team} setTeam={setTeam} next={() => setScreen(2)} />}
          {screen === 2 && <Screen2 key="s2" team={team} data={resumeData} setData={setResumeData} next={() => setScreen(3)} />}
          {screen === 3 && <Screen3 key="s3" team={team} next={() => setScreen(4)} />}
          {screen === 4 && <Screen4 key="s4" team={team} data={resumeData} back={() => setScreen(2)} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// =======================
// Screen 1: Constructor Menu
// =======================
function Screen1({ team, setTeam, next }: { team: Team, setTeam: (t: Team) => void, next: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center p-8 relative"
    >
      <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter italic mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 text-center">
        Choose Your Constructor
      </h1>
      <p className="text-zinc-400 mb-12 tracking-widest uppercase text-sm text-center">Initialize your telemetry profile</p>
      
      <div className="flex gap-6 overflow-x-auto max-w-full pb-8 px-4 snap-x snap-mandatory hide-scroll border-b border-white/5 w-full justify-start md:justify-center">
        {f1Teams.map((t) => {
          const isSelected = t.id === team.id;
          return (
            <motion.div 
              key={t.id}
              onClick={() => setTeam(t)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`snap-center shrink-0 w-64 h-96 rounded-xl cursor-pointer transition-all duration-300 glass-panel group flex flex-col items-center justify-center relative overflow-hidden`}
              style={{
                border: isSelected ? `1px solid ${t.color}` : '1px solid rgba(255,255,255,0.08)',
                boxShadow: isSelected ? `0 0 25px ${t.glow}` : '0 8px 32px 0 rgba(0,0,0,0.37)'
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundColor: t.color }} />
              <div className="text-5xl font-black italic tracking-tighter z-10 transition-colors duration-500" style={{ color: isSelected ? t.color : '#555' }}>
                {t.logo}
              </div>
              <div className={`mt-6 font-semibold text-xl tracking-wide z-10 transition-colors ${isSelected ? 'text-white' : 'text-zinc-400'}`}>
                {t.name}
              </div>
              <div className="absolute bottom-0 w-full h-1 mt-auto transition-colors" style={{ backgroundColor: isSelected ? t.color : 'transparent' }} />
            </motion.div>
          );
        })}
      </div>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={next}
        className="mt-12 px-12 py-4 rounded-full text-white font-bold tracking-widest uppercase transition-all flex items-center gap-2"
        style={{ backgroundColor: team.color, boxShadow: `0 0 20px ${team.glow}` }}
      >
        Enter Garage <ChevronRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}

// =======================
// Screen 2: The Garage Shelf
// =======================
function Screen2({ team, data, setData, next }: { team: Team, data: ResumeData, setData: React.Dispatch<React.SetStateAction<ResumeData>>, next: () => void }) {
  const [activePart, setActivePart] = useState<string | null>(null);

  const update = (field: keyof ResumeData, val: string) => setData(prev => ({ ...prev, [field]: val }));

  const GARAGE_PARTS = [
    { id: 'logistics', icon: <Settings2 className="w-12 h-12" />, label: 'Steering Wheel', desc: 'Driver Comms & Basic Info', x: '10%', y: '20%' },
    { id: 'experience', icon: <Shield className="w-12 h-12" />, label: 'Driver Helmet', desc: 'Previous Teams & Experience', x: '45%', y: '10%' },
    { id: 'achievements', icon: <Trophy className="w-12 h-12" />, label: 'Trophy Shelf', desc: 'Podiums & Records', x: '80%', y: '20%' },
    { id: 'education', icon: <Cpu className="w-12 h-12" />, label: 'Power Unit', desc: 'Education & Certifications', x: '20%', y: '60%' },
    { id: 'skills', icon: <Wind className="w-12 h-12" />, label: 'Front Wing / Aero', desc: 'Technical & Soft Skills', x: '50%', y: '65%' },
    { id: 'summary', icon: <CircleDashed className="w-12 h-12" />, label: 'Pirelli Tyres', desc: 'Profile Summary & Grip', x: '75%', y: '55%' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col relative z-20 overflow-hidden">
      <header className="w-full p-6 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-md z-30">
        <div className="flex items-center gap-4">
          <div className="font-black italic text-3xl tracking-tighter" style={{ color: team.color }}>{team.logo}</div>
          <div className="text-zinc-500 uppercase tracking-widest text-sm">Garage Inventory</div>
        </div>
        <motion.button 
          onClick={next}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2 shadow-lg"
          style={{ backgroundColor: team.color, boxShadow: `0 0 15px ${team.glow}` }}
        >
          Send to Assembly <ChevronRight className="w-4 h-4" />
        </motion.button>
      </header>

      <div className="flex-1 relative w-full h-full p-8 perspective-1000">
        <div className="absolute inset-x-0 top-1/3 h-1 bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform -rotate-1 skew-x-12 blur-[1px]"></div>
        <div className="absolute inset-x-0 top-2/3 h-1 bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform rotate-1 -skew-x-12 blur-[1px]"></div>
        
        {GARAGE_PARTS.map((part) => (
          <motion.div
            key={part.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: Math.random() * 0.3 }}
            whileHover={{ scale: 1.1, y: -10, zIndex: 50 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePart(part.id)}
            className="absolute flex flex-col items-center justify-center cursor-pointer group"
            style={{ left: part.x, top: part.y, transform: 'translate(-50%, -50%)' }}
          >
            <div className="w-32 h-32 rounded-full flex items-center justify-center relative backdrop-blur-md border border-white/10 transition-all duration-300"
                 style={{ backgroundColor: 'rgba(255,255,255,0.03)', boxShadow: `0 20px 40px -10px rgba(0,0,0,0.5)` }}>
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: team.color }} />
              <div className="text-zinc-300 group-hover:text-white transition-colors drop-shadow-2xl z-10" style={{ filter: `drop-shadow(0 0 10px ${team.color}40)` }}>
                {part.icon}
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-bold uppercase tracking-wider text-white text-sm" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{part.label}</h3>
              <p className="text-zinc-400 text-xs font-mono mt-1 w-32 truncate">{part.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Modals */}
      <AnimatePresence>
        {activePart && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              style={{ boxShadow: `0 20px 50px -10px ${team.color}40` }}
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center" style={{ backgroundColor: `${team.color}10` }}>
                <h3 className="text-xl font-bold uppercase tracking-widest text-white flex items-center gap-3">
                  <Wrench className="w-5 h-5" style={{ color: team.color }} /> Adjusting {GARAGE_PARTS.find(p => p.id === activePart)?.label}
                </h3>
                <button onClick={() => setActivePart(null)} className="text-zinc-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"><X className="w-5 h-5"/></button>
              </div>
              
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {activePart === 'logistics' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="form-label">Driver Name</label><input type="text" value={data.fullName} onChange={e => update('fullName', e.target.value)} className="form-input" /></div>
                      <div><label className="form-label">DOB</label><input type="date" value={data.dob} onChange={e => update('dob', e.target.value)} className="form-input" /></div>
                      <div><label className="form-label">Gender</label><input type="text" value={data.gender} onChange={e => update('gender', e.target.value)} className="form-input" /></div>
                      <div><label className="form-label">Radio Contact (Phone)</label><input type="tel" value={data.phone} onChange={e => update('phone', e.target.value)} className="form-input" /></div>
                      <div><label className="form-label">Email Address</label><input type="email" value={data.email} onChange={e => update('email', e.target.value)} className="form-input" /></div>
                      <div><label className="form-label">Base Location</label><input type="text" value={data.address} onChange={e => update('address', e.target.value)} className="form-input" /></div>
                    </div>
                  </>
                )}
                {activePart === 'experience' && (
                  <div><label className="form-label">Previous Constructors & Roles (Experience)</label><textarea value={data.experience} onChange={e => update('experience', e.target.value)} className="form-input h-48 resize-none" placeholder="Detail your career history..." /></div>
                )}
                {activePart === 'achievements' && (
                  <div><label className="form-label">Podiums & Championships (Achievements)</label><textarea value={data.achievements} onChange={e => update('achievements', e.target.value)} className="form-input h-48 resize-none" placeholder="Your major accomplishments..." /></div>
                )}
                {activePart === 'education' && (
                  <div><label className="form-label">Power Unit Specs (Education)</label><textarea value={data.education} onChange={e => update('education', e.target.value)} className="form-input h-48 resize-none" placeholder="University, Degrees, Engineering Certs..." /></div>
                )}
                {activePart === 'skills' && (
                  <div>
                    <label className="form-label">Aerodynamics Setup (Skills)</label>
                    <input type="text" value={data.skills} onChange={e => update('skills', e.target.value)} className="form-input mb-4" placeholder="Comma separated skills..." />
                    <div className="flex flex-wrap gap-2">
                      {data.skills.split(',').filter(s => s.trim() !== '').map((s, i) => (
                        <span key={i} className="px-3 py-1.5 rounded text-xs font-bold uppercase text-black" style={{ backgroundColor: team.color }}>{s.trim()}</span>
                      ))}
                    </div>
                  </div>
                )}
                {activePart === 'summary' && (
                  <div><label className="form-label">Race Strategy & Setup (Profile Summary)</label><textarea value={data.summary} onChange={e => update('summary', e.target.value)} className="form-input h-48 resize-none" placeholder="Brief outline of your professional profile..." /></div>
                )}
              </div>
              
              <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end">
                <button onClick={() => setActivePart(null)} className="px-8 py-3 rounded font-bold uppercase tracking-widest text-white transition-all shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95" style={{ backgroundColor: team.color }}>
                  <CheckCircle2 className="w-5 h-5"/> Torqued & Ready
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// =======================
// Screen 3: The Assembly Animation
// =======================
function Screen3({ team, next }: { team: Team, next: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Step 1: Chassis in
      setStep(1);
      await new Promise(r => setTimeout(r, 1500));
      // Step 2: Engine lowering
      setStep(2);
      await new Promise(r => setTimeout(r, 1500));
      // Step 3: Aero / Wings
      setStep(3);
      await new Promise(r => setTimeout(r, 1500));
      // Step 4: Tyres on
      setStep(4);
      await new Promise(r => setTimeout(r, 1500));
      // Step 5: Refuelling & Firing up
      setStep(5);
      await new Promise(r => setTimeout(r, 2000));
      // Go next
      next();
    };
    sequence();
  }, [next]);

  const stepMessages = [
    "Initializing Factory...",
    "Moulding Carbon Fiber Chassis...",
    "Lowering Power Unit (V6 Hybrid)...",
    "Attaching High-Downforce Aero...",
    "Fitting Soft Compound Pirellis...",
    "Refuelling & Ignition..."
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 relative z-50 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)' }} />
      
      {/* Assembly Area */}
      <div className="relative w-96 h-64 md:w-[600px] md:h-[400px] flex items-center justify-center border border-white/5 rounded-3xl bg-zinc-900/50 backdrop-blur-sm overflow-hidden"
           style={{ boxShadow: `0 0 100px ${team.color}15 inset, 0 0 50px black` }}>
           
        {/* Step 1: Chassis */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div 
              initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="absolute w-64 h-24 bg-zinc-800 rounded-full flex items-center justify-center border-2 border-zinc-700 shadow-2xl"
              style={{ zIndex: 10 }}
            >
              <div className="w-32 h-12 bg-black rounded-full opacity-50" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Engine */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div 
              initial={{ y: -200, opacity: 0 }} animate={{ y: -20, opacity: 1 }} transition={{ type: 'spring', bounce: 0.6 }}
              className="absolute text-5xl z-20 flex items-center justify-center drop-shadow-xl"
              style={{ color: team.color }}
            >
              <Cpu className="w-16 h-16 drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Aero */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div 
              initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="absolute w-80 h-32 flex justify-between items-center z-10"
            >
              <Wind className="w-20 h-20 text-zinc-500 absolute -left-12 drop-shadow-lg" style={{ filter: `drop-shadow(0 0 10px ${team.color})` }} />
              <Wind className="w-16 h-16 text-zinc-500 absolute -right-8 opacity-70 transform rotate-180" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Tyres */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div className="absolute inset-0 flex items-center justify-center z-30">
              <motion.div initial={{ x: -200, rotate: -360 }} animate={{ x: -110, rotate: 0 }} className="absolute text-zinc-300 drop-shadow-xl"><CircleDashed className="w-20 h-20 fill-black" /></motion.div>
              <motion.div initial={{ x: 200, rotate: 360 }} animate={{ x: 110, rotate: 0 }} className="absolute text-zinc-300 drop-shadow-xl"><CircleDashed className="w-20 h-20 fill-black" /></motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 5: Fuel & Final Glow */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
              className="absolute inset-0 mix-blend-overlay z-40 flex items-center justify-center"
              style={{ background: `radial-gradient(circle, ${team.color}40 0%, transparent 70%)` }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
                <Settings2 className="w-full h-full text-white/10" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 text-center h-20">
        <h2 className="text-2xl font-black italic tracking-widest uppercase" style={{ color: team.color }}>
          {stepMessages[step]}
        </h2>
        <div className="w-64 h-1 bg-zinc-900 rounded-full mt-6 mx-auto overflow-hidden relative">
          <motion.div 
            className="absolute left-0 top-0 h-full"
            initial={{ width: "0%" }} animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: team.color, boxShadow: `0 0 10px ${team.color}` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// =======================
// Screen 4: Podium Output
// =======================
function Screen4({ team, data, back }: { team: Team, data: ResumeData, back: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full flex flex-col md:flex-row gap-8 p-6 md:p-12 overflow-hidden items-center justify-center">
      
      {/* Printable Resume Panel */}
      <div 
        className="w-full md:w-1/2 h-full bg-white text-black p-8 md:p-12 overflow-y-auto rounded-xl flex flex-col selection:bg-black selection:text-white print:w-full print:h-auto print:overflow-visible print:border-none print:shadow-none print:p-0"
        style={{ boxShadow: `0 0 50px ${team.glow}` }}
      >
        <div className="border-b-4 pb-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4" style={{ borderColor: team.color }}>
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter shrink-0">{data.fullName}</h1>
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-gray-500 mt-2">Telemetry Specialist</h2>
          </div>
          <div className="text-left md:text-right text-sm text-gray-600 space-y-2 font-mono mt-2 md:mt-0">
            <div className="flex items-center md:justify-end gap-2"><Mail className="w-4 h-4" style={{ color: team.color }} /> {data.email}</div>
            <div className="flex items-center md:justify-end gap-2"><Phone className="w-4 h-4" style={{ color: team.color }} /> {data.phone}</div>
            <div className="flex items-center md:justify-end gap-2"><MapPin className="w-4 h-4" style={{ color: team.color }} /> {data.address}</div>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeader title="Profile Outline" icon={<Zap className="w-4 h-4 text-white" />} color={team.color} />
          <p className="text-gray-700 leading-relaxed text-sm md:text-base font-medium whitespace-pre-wrap">{data.summary}</p>
        </div>

        <div className="mb-8">
          <SectionHeader title="Previous Teams (Experience)" icon={<Briefcase className="w-4 h-4 text-white" />} color={team.color} />
          <p className="text-gray-700 leading-relaxed text-sm md:text-base font-medium whitespace-pre-wrap">{data.experience}</p>
        </div>

        <div className="mb-8">
          <SectionHeader title="Trophies & Records" icon={<Trophy className="w-4 h-4 text-white" />} color={team.color} />
          <p className="text-gray-700 leading-relaxed text-sm md:text-base font-medium whitespace-pre-wrap">{data.achievements}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1">
            <SectionHeader title="Physical Specs" icon={<Wrench className="w-4 h-4 text-white" />} color={team.color} />
            <ul className="text-sm md:text-base space-y-3 text-gray-700 font-semibold font-mono">
              <li><span className="text-gray-400">DOB:</span> <span className="ml-2">{data.dob}</span></li>
              <li><span className="text-gray-400">GNDR:</span> <span className="ml-2">{data.gender}</span></li>
              <li><span className="text-gray-400">TYPE:</span> <span className="ml-2">Prototype Gen-1</span></li>
            </ul>
          </div>
          <div className="flex-1">
            <SectionHeader title="Power Unit" icon={<GraduationCap className="w-4 h-4 text-white" />} color={team.color} />
            <div className="text-base font-bold text-gray-900">{data.education}</div>
            <div className="text-sm text-gray-500 italic mt-1">Certified Setup</div>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeader title="Aerodynamics (Skills)" icon={<Wind className="w-4 h-4 text-white" />} color={team.color} />
          <div className="flex flex-wrap gap-2">
            {data.skills.split(',').filter(s => s.trim() !== '').map((s, i) => (
              <span key={i} className="px-3 py-1.5 border-2 rounded text-xs md:text-sm font-bold uppercase text-gray-800" style={{ borderColor: `${team.color}40`, backgroundColor: `${team.color}10` }}>
                {s.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-8 text-center text-gray-200 font-black italic tracking-tighter text-6xl opacity-30 select-none pointer-events-none">
          {team.logo}
        </div>
      </div>

      {/* Interactive Garage Dashboard */}
      <div className="w-full md:w-5/12 h-full flex flex-col items-center justify-between py-12 glass-panel rounded-xl print:hidden">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-5xl font-black italic tracking-tighter mb-2" style={{ color: team.color }}>SUCCESS</h2>
          <div className="text-zinc-400 font-mono tracking-widest uppercase text-sm">Target Lap Time Achieved</div>
        </div>

        <div className="relative w-full flex-1 flex items-center justify-center pointer-events-none">
          <motion.img 
            initial={{ scale: 0.8, rotate: 90 }}
            animate={{ scale: 1, rotate: 90 }}
            transition={{ type: "spring", bounce: 0.5 }}
            src={team.carTopView} 
            className="w-3/4 object-contain filter drop-shadow-2xl" 
            style={{ filter: `drop-shadow(0 0 50px ${team.glow})` }} 
          />
        </div>

        <div className="w-full max-w-sm flex flex-col gap-4 px-8">
          <motion.button 
            onClick={() => window.print()}
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.97 }} 
            className="w-full py-4 rounded-xl shadow-lg border-b-4 border-black/20 font-bold uppercase tracking-widest text-white transition-all flex justify-center items-center gap-2" 
            style={{ backgroundColor: team.color }}
          >
            <Download className="w-5 h-5" /> Download PDF
          </motion.button>
          <motion.button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.97 }} 
            className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-white transition-all flex justify-center items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10"
          >
            <Share2 className="w-5 h-5" /> Share Report
          </motion.button>
          <button onClick={back} className="w-full py-4 mt-2 font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors text-sm flex justify-center items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return to Garage
          </button>
        </div>
      </div>

    </motion.div>
  );
}

function SectionHeader({ title, icon, color }: { title: string, icon: React.ReactNode, color: string }) {
  return (
    <h3 className="text-sm md:text-base font-bold uppercase tracking-widest mb-4 flex items-center gap-3 text-gray-400">
      <span className="w-7 h-7 rounded flex items-center justify-center shadow-sm" style={{ backgroundColor: color }}>
        {icon}
      </span> 
      {title}
    </h3>
  );
}

export default App;