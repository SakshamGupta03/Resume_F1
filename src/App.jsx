import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Wrench, Download, Share2, ArrowLeft, GraduationCap, Cpu, Wind, Mail, Phone, MapPin, Zap, Trophy, CircleDashed, Briefcase, X, CheckCircle2, Shield, Settings2 } from 'lucide-react';
import { f1Teams, initialResumeData } from './data';

function App() {
  const [screen, setScreen] = useState(1);
  const [team, setTeam] = useState(f1Teams[0]);
  const [resumeData, setResumeData] = useState(initialResumeData);

  return (
    <div className="app-root">
      {/* Background Ambience */}
      <div
        className="app-bg-glow"
        style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${team.glow} 0%, transparent 60%)` }}
      />
      <div className="app-bg-texture" />

      {/* Main Screens */}
      <main className="app-main">
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
function Screen1({ team, setTeam, next }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="screen1"
    >
      <h1 className="screen1-title">
        Choose Your Constructor
      </h1>
      <p className="screen1-subtitle">Initialize your telemetry profile</p>

      <div className="team-carousel">
        {f1Teams.map((t) => {
          const isSelected = t.id === team.id;
          return (
            <motion.div
              key={t.id}
              onClick={() => setTeam(t)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="team-card"
              style={{
                border: isSelected ? `1px solid ${t.color}` : '1px solid rgba(255,255,255,0.08)',
                boxShadow: isSelected ? `0 0 25px ${t.glow}` : '0 8px 32px 0 rgba(0,0,0,0.37)'
              }}
            >
              <div className="team-card-hover-overlay" style={{ backgroundColor: t.color }} />
              <div className="team-card-logo" style={{ color: isSelected ? t.color : '#555' }}>
                {t.logo}
              </div>
              <div className="team-card-name" style={{ color: isSelected ? '#fff' : '#a1a1aa' }}>
                {t.name}
              </div>
              <div className="team-card-stripe" style={{ backgroundColor: isSelected ? t.color : 'transparent' }} />
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={next}
        className="btn-primary"
        style={{ backgroundColor: team.color, boxShadow: `0 0 20px ${team.glow}` }}
      >
        Enter Garage <ChevronRight className="icon-5" />
      </motion.button>
    </motion.div>
  );
}

// =======================
// Screen 2: The Garage Shelf
// =======================
function Screen2({ team, data, setData, next }) {
  const [activePart, setActivePart] = useState(null);

  const update = (field, val) => setData(prev => ({ ...prev, [field]: val }));

  const GARAGE_PARTS = [
    { id: 'logistics', icon: <Settings2 className="icon-5" style={{ width: '3rem', height: '3rem' }} />, label: 'Steering Wheel', desc: 'Driver Comms & Basic Info', x: '10%', y: '20%' },
    { id: 'experience', icon: <Shield className="icon-5" style={{ width: '3rem', height: '3rem' }} />, label: 'Driver Helmet', desc: 'Previous Teams & Experience', x: '45%', y: '10%' },
    { id: 'achievements', icon: <Trophy className="icon-5" style={{ width: '3rem', height: '3rem' }} />, label: 'Trophy Shelf', desc: 'Podiums & Records', x: '80%', y: '20%' },
    { id: 'education', icon: <Cpu className="icon-5" style={{ width: '3rem', height: '3rem' }} />, label: 'Power Unit', desc: 'Education & Certifications', x: '20%', y: '60%' },
    { id: 'skills', icon: <Wind className="icon-5" style={{ width: '3rem', height: '3rem' }} />, label: 'Front Wing / Aero', desc: 'Technical & Soft Skills', x: '50%', y: '65%' },
    { id: 'summary', icon: <CircleDashed className="icon-5" style={{ width: '3rem', height: '3rem' }} />, label: 'Pirelli Tyres', desc: 'Profile Summary & Grip', x: '75%', y: '55%' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="screen2">
      <header className="garage-header">
        <div className="garage-header-left">
          <div className="garage-header-logo" style={{ color: team.color }}>{team.logo}</div>
          <div className="garage-header-label">Garage Inventory</div>
        </div>
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-assembly"
          style={{ backgroundColor: team.color, boxShadow: `0 0 15px ${team.glow}` }}
        >
          Send to Assembly <ChevronRight className="icon-4" />
        </motion.button>
      </header>

      <div className="garage-floor">
        <div className="garage-shelf-line garage-shelf-line--top"></div>
        <div className="garage-shelf-line garage-shelf-line--bottom"></div>

        {GARAGE_PARTS.map((part) => (
          <motion.div
            key={part.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: Math.random() * 0.3 }}
            whileHover={{ scale: 1.1, y: -10, zIndex: 50 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePart(part.id)}
            className="garage-part"
            style={{ left: part.x, top: part.y, transform: 'translate(-50%, -50%)' }}
          >
            <div className="garage-part-circle">
              <div className="garage-part-hover-overlay" style={{ backgroundColor: team.color }} />
              <div className="garage-part-icon" style={{ filter: `drop-shadow(0 0 10px ${team.color}40)` }}>
                {part.icon}
              </div>
            </div>
            <div className="garage-part-info">
              <h3 className="garage-part-label">{part.label}</h3>
              <p className="garage-part-desc">{part.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Modals */}
      <AnimatePresence>
        {activePart && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="modal-overlay"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="modal-content"
              style={{ boxShadow: `0 20px 50px -10px ${team.color}40` }}
            >
              <div className="modal-header" style={{ backgroundColor: `${team.color}10` }}>
                <h3 className="modal-title">
                  <Wrench className="modal-title-icon" style={{ color: team.color }} /> Adjusting {GARAGE_PARTS.find(p => p.id === activePart)?.label}
                </h3>
                <button onClick={() => setActivePart(null)} className="modal-close-btn"><X /></button>
              </div>

              <div className="modal-body">
                {activePart === 'logistics' && (
                  <>
                    <div className="form-grid">
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
                  <div><label className="form-label">Previous Constructors & Roles (Experience)</label><textarea value={data.experience} onChange={e => update('experience', e.target.value)} className="form-input form-input--textarea" placeholder="Detail your career history..." /></div>
                )}
                {activePart === 'achievements' && (
                  <div><label className="form-label">Podiums & Championships (Achievements)</label><textarea value={data.achievements} onChange={e => update('achievements', e.target.value)} className="form-input form-input--textarea" placeholder="Your major accomplishments..." /></div>
                )}
                {activePart === 'education' && (
                  <div><label className="form-label">Power Unit Specs (Education)</label><textarea value={data.education} onChange={e => update('education', e.target.value)} className="form-input form-input--textarea" placeholder="University, Degrees, Engineering Certs..." /></div>
                )}
                {activePart === 'skills' && (
                  <div>
                    <label className="form-label">Aerodynamics Setup (Skills)</label>
                    <input type="text" value={data.skills} onChange={e => update('skills', e.target.value)} className="form-input form-input--skills" placeholder="Comma separated skills..." />
                    <div className="skill-tags-preview">
                      {data.skills.split(',').filter(s => s.trim() !== '').map((s, i) => (
                        <span key={i} className="skill-tag-preview" style={{ backgroundColor: team.color }}>{s.trim()}</span>
                      ))}
                    </div>
                  </div>
                )}
                {activePart === 'summary' && (
                  <div><label className="form-label">Race Strategy & Setup (Profile Summary)</label><textarea value={data.summary} onChange={e => update('summary', e.target.value)} className="form-input form-input--textarea" placeholder="Brief outline of your professional profile..." /></div>
                )}
              </div>

              <div className="modal-footer">
                <button onClick={() => setActivePart(null)} className="btn-torqued" style={{ backgroundColor: team.color }}>
                  <CheckCircle2 /> Torqued & Ready
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
function Screen3({ team, next }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      setStep(1);
      await new Promise(r => setTimeout(r, 1500));
      setStep(2);
      await new Promise(r => setTimeout(r, 1500));
      setStep(3);
      await new Promise(r => setTimeout(r, 1500));
      setStep(4);
      await new Promise(r => setTimeout(r, 1500));
      setStep(5);
      await new Promise(r => setTimeout(r, 2000));
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="screen3">
      <div className="screen3-gradient" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)' }} />

      {/* Assembly Area */}
      <div className="assembly-area"
           style={{ boxShadow: `0 0 100px ${team.color}15 inset, 0 0 50px black` }}>

        {/* Step 1: Chassis */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="assembly-chassis"
            >
              <div className="assembly-chassis-inner" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Engine */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ y: -200, opacity: 0 }} animate={{ y: -20, opacity: 1 }} transition={{ type: 'spring', bounce: 0.6 }}
              className="assembly-engine"
              style={{ color: team.color }}
            >
              <Cpu style={{ filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.15))' }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Aero */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="assembly-aero"
            >
              <div className="assembly-aero-left" style={{ filter: `drop-shadow(0 0 10px ${team.color})` }}>
                <Wind />
              </div>
              <div className="assembly-aero-right">
                <Wind />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Tyres */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div className="assembly-tyres-wrap">
              <motion.div initial={{ x: -200, rotate: -360 }} animate={{ x: -110, rotate: 0 }} className="assembly-tyre"><CircleDashed /></motion.div>
              <motion.div initial={{ x: 200, rotate: 360 }} animate={{ x: 110, rotate: 0 }} className="assembly-tyre"><CircleDashed /></motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 5: Fuel & Final Glow */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
              className="assembly-glow"
              style={{ background: `radial-gradient(circle, ${team.color}40 0%, transparent 70%)` }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="assembly-gear">
                <Settings2 />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="assembly-status">
        <h2 className="assembly-status-title" style={{ color: team.color }}>
          {stepMessages[step]}
        </h2>
        <div className="assembly-progress-track">
          <motion.div
            className="assembly-progress-fill"
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
function Screen4({ team, data, back }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="screen4">

      {/* Printable Resume Panel */}
      <div
        className="resume-panel"
        style={{ boxShadow: `0 0 50px ${team.glow}` }}
      >
        <div className="resume-header" style={{ borderColor: team.color }}>
          <div>
            <h1 className="resume-name">{data.fullName}</h1>
            <h2 className="resume-subtitle">Telemetry Specialist</h2>
          </div>
          <div className="resume-contact">
            <div className="resume-contact-item"><Mail className="resume-contact-icon" style={{ color: team.color }} /> {data.email}</div>
            <div className="resume-contact-item"><Phone className="resume-contact-icon" style={{ color: team.color }} /> {data.phone}</div>
            <div className="resume-contact-item"><MapPin className="resume-contact-icon" style={{ color: team.color }} /> {data.address}</div>
          </div>
        </div>

        <div className="resume-section">
          <SectionHeader title="Profile Outline" icon={<Zap />} color={team.color} />
          <p className="resume-text">{data.summary}</p>
        </div>

        <div className="resume-section">
          <SectionHeader title="Previous Teams (Experience)" icon={<Briefcase />} color={team.color} />
          <p className="resume-text">{data.experience}</p>
        </div>

        <div className="resume-section">
          <SectionHeader title="Trophies & Records" icon={<Trophy />} color={team.color} />
          <p className="resume-text">{data.achievements}</p>
        </div>

        <div className="resume-specs-row">
          <div className="resume-specs-col">
            <SectionHeader title="Physical Specs" icon={<Wrench />} color={team.color} />
            <ul className="specs-list">
              <li><span className="spec-label">DOB:</span><span className="spec-value">{data.dob}</span></li>
              <li><span className="spec-label">GNDR:</span><span className="spec-value">{data.gender}</span></li>
              <li><span className="spec-label">TYPE:</span><span className="spec-value">Prototype Gen-1</span></li>
            </ul>
          </div>
          <div className="resume-specs-col">
            <SectionHeader title="Power Unit" icon={<GraduationCap />} color={team.color} />
            <div className="education-value">{data.education}</div>
            <div className="education-caption">Certified Setup</div>
          </div>
        </div>

        <div className="resume-section">
          <SectionHeader title="Aerodynamics (Skills)" icon={<Wind />} color={team.color} />
          <div className="skills-grid">
            {data.skills.split(',').filter(s => s.trim() !== '').map((s, i) => (
              <span key={i} className="skill-badge" style={{ borderColor: `${team.color}40`, backgroundColor: `${team.color}10` }}>
                {s.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="resume-watermark">
          {team.logo}
        </div>
      </div>

      {/* Interactive Garage Dashboard */}
      <div className="dashboard-panel">
        <div className="dashboard-success">
          <h2 className="dashboard-success-title" style={{ color: team.color }}>SUCCESS</h2>
          <div className="dashboard-success-subtitle">Target Lap Time Achieved</div>
        </div>

        <div className="dashboard-car-wrap">
          <motion.img
            initial={{ scale: 0.8, rotate: 90 }}
            animate={{ scale: 1, rotate: 90 }}
            transition={{ type: "spring", bounce: 0.5 }}
            src={team.carTopView}
            className="dashboard-car-img"
            style={{ filter: `drop-shadow(0 0 50px ${team.glow})` }}
          />
        </div>

        <div className="dashboard-actions">
          <motion.button
            onClick={() => window.print()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-download"
            style={{ backgroundColor: team.color }}
          >
            <Download className="icon-5" /> Download PDF
          </motion.button>
          <motion.button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-share"
          >
            <Share2 className="icon-5" /> Share Report
          </motion.button>
          <button onClick={back} className="btn-back">
            <ArrowLeft className="icon-4" /> Return to Garage
          </button>
        </div>
      </div>

    </motion.div>
  );
}

function SectionHeader({ title, icon, color }) {
  return (
    <h3 className="section-header">
      <span className="section-header-icon" style={{ backgroundColor: color }}>
        {icon}
      </span>
      {title}
    </h3>
  );
}

export default App;
