import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  AlertCircle, 
  Smartphone, 
  Clock, 
  ShieldAlert, 
  ChevronRight, 
  X,
  Info,
  ChevronDown,
  Monitor,
  Globe,
  Settings,
  Search,
  Zap,
  MousePointer2,
  Calendar,
  TriangleAlert,
  ArrowRightCircle
} from "lucide-react";

type Stage = "PORTAL" | "PLAYBACK" | "BILLING" | "REFLECTION";

export default function App() {
  const [stage, setStage] = useState<Stage>("PORTAL");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [paymentClickCount, setPaymentClickCount] = useState(0);
  const [timer, setTimer] = useState(3 * 24 * 60 * 60);

  // Fix billing info so it doesn't change once generated
  const billingData = useMemo(() => ({
    id: "ORD-" + Math.floor(Math.random() * 900000 + 100000),
    time: new Date().toLocaleString("ja-JP", {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }),
    ip: `122.215.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` // Realistic looking IP
  }), []);

  const [systemInfo, setSystemInfo] = useState<any>({});

  useEffect(() => {
    // Detect more accurate OS info
    const ua = navigator.userAgent;
    let os = "不明なOS";
    if (ua.indexOf("Win") !== -1) os = "Windows";
    if (ua.indexOf("Mac") !== -1) os = "macOS / iOS";
    if (ua.indexOf("Android") !== -1) os = "Android";
    if (ua.indexOf("Linux") !== -1 && ua.indexOf("Android") === -1) os = "Linux";

    setSystemInfo({
      userAgent: navigator.userAgent,
      platform: os + " (" + navigator.platform + ")",
      language: navigator.language,
      screenRes: `${window.screen.width} x ${window.screen.height}`,
      colorDepth: `${window.screen.colorDepth}-bit`,
      logicalProcessors: navigator.hardwareConcurrency || "4",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cookiesEnabled: navigator.cookieEnabled ? "有効" : "無効",
      referrer: document.referrer || "直接アクセス (または非公開)",
      browserName: ua.indexOf("Chrome") !== -1 ? "Google Chrome" : ua.indexOf("Firefox") !== -1 ? "Firefox" : ua.indexOf("Safari") !== -1 ? "Safari" : "Other Browser"
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const d = Math.floor(seconds / (24 * 3600));
    const h = Math.floor((seconds % (24 * 3600)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d}日 ${h}時間 ${m}分 ${s}秒`;
  };

  const handlePaymentClick = () => {
    const newCount = paymentClickCount + 1;
    setPaymentClickCount(newCount);
    if (newCount >= 3) {
      setStage("REFLECTION");
    } else {
      alert("※デモ画面です。実際にお金は払わないでください。冷静になって、あと少しクリックしてみましょう。");
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-slate-200 font-sans selection:bg-pink-600 selection:text-white leading-relaxed">
      {/* Education Header */}
      <div className="bg-amber-100 text-amber-900 px-4 py-2 text-center text-[10px] md:text-xs font-black sticky top-0 z-[300] shadow-md border-b border-amber-300 uppercase tracking-tighter">
        ⚠️ これは「ワンクリック詐欺」の仕組みを知るための学習用シミュレーターです ⚠️
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          className="ml-4 underline hover:text-amber-700 transition-colors inline-flex items-center gap-1"
        >
          <Info size={12} /> {showExplanation ? "解説を消す" : "手口の解説を表示"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {stage === "PORTAL" && (
          <motion.div
            key="portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-[1240px] mx-auto"
          >
            {/* Shady Portal Header */}
            <header className="bg-slate-900 border-b-2 border-pink-600 p-4 mb-2">
               <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                 <h1 className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-400 flex items-center gap-2">
                   <Zap className="text-pink-500" fill="currentColor" /> プレミアム動画まとめNEO
                 </h1>
                 <div className="flex items-center bg-black border border-slate-700 rounded-full px-4 py-1.5 w-full md:w-auto">
                   <Search size={14} className="text-slate-500 mr-2" />
                   <input type="text" placeholder="キーワード検索..." className="bg-transparent text-xs outline-none flex-grow" readOnly />
                 </div>
               </div>
               <nav className="flex gap-6 overflow-x-auto no-scrollbar text-[11px] font-bold text-slate-300 border-t border-slate-800 pt-3">
                 {["人気動画", "新作", "独占", "生配信", "アダルト(20+)", "VR特集", "ヘルプ"].map(n => (
                   <span key={n} className="hover:text-pink-500 cursor-pointer whitespace-nowrap transition-colors">{n}</span>
                 ))}
               </nav>
            </header>

            {/* Fake News Ticker */}
            <div className="bg-slate-950 border-b border-slate-800 p-1 mb-4 flex items-center gap-2">
              <span className="bg-red-600 text-[8px] font-black px-1 rounded text-white animate-pulse">FLASH</span>
              <div className="overflow-hidden whitespace-nowrap text-[10px] text-slate-400 w-full">
                <motion.div 
                  animate={{ x: [1200, -1200] }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                >
                  【注目】本日限定で最高画質のVRコンテンツが解放中！ ｜ システムメンテナンスは26時から実施予定 ｜ ID:88291 さんがプレミアム会員にアップグレードしました
                </motion.div>
              </div>
            </div>

            <div className="px-4 grid grid-cols-12 gap-4 pb-20">
              {/* Left Sidebar */}
              <aside className="hidden lg:block col-span-3 space-y-4">
                <div className="bg-slate-900/50 border border-slate-800 rounded p-4">
                  <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
                    今週のキーワード <ChevronRight size={12} />
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {["流出動画", "密撮", "ハプニング", "スキャンダル", "VR", "衝撃の結末", "禁断"].map(k => (
                      <span key={k} className="bg-slate-950 px-2 py-1 rounded text-[9px] border border-slate-800 text-slate-400 hover:text-pink-500 hover:border-pink-500 cursor-pointer">{k}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded p-4 overflow-hidden">
                   <h2 className="text-[10px] font-black text-slate-500 mb-4 uppercase tracking-widest">閲覧ランキング</h2>
                   <div className="space-y-4">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="flex gap-3 group cursor-pointer" onClick={() => setStage("PLAYBACK")}>
                          <span className={`text-xl font-black italic ${i <= 3 ? 'text-pink-500' : 'text-slate-700'}`}>{i}</span>
                          <div className="flex-grow">
                             <p className="text-[10px] font-bold line-clamp-2 leading-tight group-hover:text-pink-400 transition-colors">
                               深夜の放送事故！あの人気モデルが自宅で...
                             </p>
                             <p className="text-[8px] text-slate-600 mt-1">32,941 views</p>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </aside>

              {/* Main Feed */}
              <main className="col-span-12 lg:col-span-9 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -2 }}
                      className="group cursor-pointer bg-slate-900/40 rounded border border-slate-800 hover:border-pink-600 transition-all flex flex-col"
                      onClick={() => setStage("PLAYBACK")}
                    >
                      <div className="relative aspect-video bg-black overflow-hidden rounded-t">
                        <img 
                          src={`https://images.unsplash.com/photo-${[
                            "1534528741775-53396c6d2fe5", // Woman portrait
                            "1524504388940-b1c1722653e1", // Fashion model
                            "1534751516642-a1af1ef26a56", // Fashion
                            "1494790108377-be9c29b29330", // Happy young woman
                            "1531746020798-e795c5394c44", // Woman portrait
                            "1509060408490-b1d80ec92095"  // Portrait
                          ][i % 6]}?auto=format&fit=crop&w=400&q=80`}
                          alt="Thumbnail"
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                        {showExplanation && i === 0 && (
                          <div className="absolute inset-0 bg-amber-500/90 z-20 flex items-center justify-center p-4 text-center text-[11px] leading-relaxed">
                            <p className="text-white font-black">
                              【罠: クリックベイト】<br/>
                              大げさな見出しと、再生できそうなサムネイルで興味を引きます。
                            </p>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="text-white/40 group-hover:text-pink-500 transition-colors" size={32} />
                        </div>
                        <span className="absolute bottom-1 right-1 bg-black/70 text-[8px] px-1 font-mono text-white">18:42</span>
                        <div className="absolute top-1 left-1 bg-gradient-to-r from-red-600 to-pink-600 text-[8px] px-1.5 font-bold italic rounded-sm shadow-lg">PREMIUM</div>
                      </div>
                      <div className="p-2.5">
                        <p className="text-[11px] font-black leading-tight line-clamp-2 min-h-[2.2rem] group-hover:text-pink-400">
                          {i % 2 === 0 ? "【衝撃映像】街角で声をかけた女子大生がまさかの展開に..." : "絶対に笑ってはいけない深夜のハプニングまとめ100連発！"}
                        </p>
                        <div className="flex justify-between items-center text-[8px] text-slate-500 mt-2">
                          <span className="flex items-center gap-1"><Monitor size={8} /> 4k Ultra HD</span>
                          <span className="bg-slate-800 px-1 rounded italic text-slate-400">#Ch.{i + 1}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Big Shady Ad Banner */}
                <div 
                  className="relative h-28 bg-gradient-to-r from-indigo-900 to-pink-900 rounded-lg overflow-hidden cursor-pointer group border-2 border-indigo-500/30"
                  onClick={() => setStage("PLAYBACK")}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80" 
                    alt="Banner" 
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="text-lg font-black italic tracking-tighter text-white group-hover:scale-110 transition-transform">
                       今だけ！プレミアム会員 ￥0 で全動画 視聴可能！
                    </h3>
                    <p className="text-[10px] text-pink-300 font-bold mt-1 bg-black/40 px-3 py-0.5 rounded-full">
                       期間限定キャンペーン終了まであと 12:44:09
                    </p>
                  </div>
                  <TriangleAlert className="absolute top-2 right-2 text-white/20" size={16} />
                </div>
              </main>
            </div>
          </motion.div>
        )}

        {stage === "PLAYBACK" && (
          <motion.div
            key="playback"
            className="flex flex-col min-h-screen bg-black relative"
          >
            {/* Playback Header */}
            <div className="p-4 border-b border-slate-900 bg-[#070709] flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button onClick={() => setStage("PORTAL")} className="text-slate-500 hover:text-white transition-colors">
                  <X />
                </button>
                <div className="h-4 w-px bg-slate-800" />
                <h2 className="text-xs md:text-sm font-black truncate text-slate-200">
                   Premium View: [4K] 深夜の秘密チャンネル - 放送禁止ギリギリの検証
                </h2>
              </div>
              <div className="hidden md:flex gap-3">
                 <Settings size={14} className="text-slate-600" />
                 <Globe size={14} className="text-slate-600" />
              </div>
            </div>

            <main className="flex-grow flex flex-col items-center justify-start pt-8 md:pt-16 px-4">
              {/* Video Container */}
              <div className="relative max-w-5xl w-full aspect-video bg-[#0a0a0c] rounded shadow-[0_0_80px_rgba(219,39,119,0.1)] border border-slate-900 group">
                <img 
                  src="https://images.unsplash.com/photo-1529139513466-42016c431b63?auto=format&fit=crop&w=1200&q=80" 
                  alt="Video content" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Fake Controls Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setShowConfirmBox(true)}
                     className="w-24 h-24 md:w-32 md:h-32 bg-pink-700/90 rounded-full flex items-center justify-center shadow-2xl transition-all border-4 border-white/10 group-hover:bg-pink-600"
                   >
                     <Play fill="white" size={56} className="ml-2" />
                   </motion.button>
                </div>
                
                {/* Visual Fake Noise */}
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                   <span className="bg-red-600 text-[8px] font-black px-1 rounded self-start">LIVE</span>
                   <span className="text-[10px] text-white/40 font-mono">REC ● 00:00:00</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
                  <div className="h-full w-[1%] bg-pink-600" />
                </div>
              </div>

              {/* Action Area */}
              <div className="max-w-5xl w-full mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                 <div className="md:col-span-3 bg-slate-900/50 p-6 rounded border border-slate-800">
                    <h3 className="text-lg font-black text-pink-500 mb-1">今すぐ全編を視聴する</h3>
                    <p className="text-[11px] text-slate-500">※本動画はプレミアム会員限定です。上の「再生ボタン」のみでログイン・視聴が可能です。</p>
                 </div>
                 <div className="bg-slate-900 border border-slate-800 rounded p-6 flex flex-col justify-center items-center gap-2">
                    <button onClick={() => setShowConfirmBox(true)} className="w-full bg-pink-600 hover:bg-pink-500 text-white font-black py-2 rounded text-xs transition-colors">入場する</button>
                    <span className="text-[9px] text-slate-600">現在の接続: Stable</span>
                 </div>
              </div>

              {/* Scroll Reminder */}
              <div className="mt-12 flex flex-col items-center gap-3 text-slate-700 opacity-50 animate-bounce">
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Scroll for Terms</span>
                <ChevronDown size={18} />
              </div>

              {/* The "Hidden" Terms - Way down */}
              <div className="max-w-2xl w-full mt-[1600px] mb-40 p-12 bg-[#0c0c0e] rounded-xl text-[9px] leading-relaxed text-slate-600 border border-slate-900 relative">
                {showExplanation && (
                  <div className="absolute -top-16 left-0 right-0 flex justify-center">
                    <div className="bg-amber-500 text-white px-5 py-2 rounded-full text-xs font-black flex items-center gap-3 shadow-2xl ring-4 ring-amber-500/20">
                      <ShieldAlert size={18} /> 手口解説：ここに利用規約を隠蔽しています
                    </div>
                  </div>
                )}
                <h4 className="font-black text-slate-500 mb-4 border-b border-slate-900 pb-2 uppercase tracking-widest italic">User Agreement & Terms of Service v4.2</h4>
                <div className="space-y-3">
                  <p>
                    本サービスの「再生ボタン」または周辺の「入場」リンクを押下した時点で、お客様は本利用規約に全面的に同意し、正式な有料会員登録を完了したものとみなされます。
                  </p>
                  <p>
                    1. 会員登録費用：初回事務手数料 98,000円（不課税）。<br/>
                    2. 月額費用：12,000円。なお、初回の決済には初期費用が含まれます。<br/>
                    3. 電子消費者契約法 第四条に基づき、意思表示の錯誤を主張される場合は、弊社指定のカスタマーセンターへのお電話（平日10:00-14:00）が必要です。<br/>
                    4. キャンセル可能期間は登録完了後1分以内とします。それを過ぎた場合は自動的に債権が発生し、債権回収業者への委託対象となります。<br/>
                    5. お客様のIPアドレス（{billingData.ip}）、UserAgent、および端末固有識別情報を取得し、支払いが確認できない場合の法的措置（プロバイダへの開示請求等）に使用します。
                  </p>
                </div>
              </div>
            </main>

            {/* Deceptive Confirmation Box */}
            <AnimatePresence>
              {showConfirmBox && (
                <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-slate-900 border border-slate-800 p-8 rounded-lg max-w-sm w-full text-center shadow-2xl"
                  >
                    <h3 className="text-lg font-black text-white mb-4">年齢確認と再生の開始</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-8">
                       あなたは20歳以上ですか？<br/>
                       「はい、再生します」を選択すると動画が開始されます。
                    </p>
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => setStage("BILLING")}
                        className="bg-pink-600 hover:bg-pink-500 text-white font-black py-4 rounded-md transition-all active:scale-[0.98]"
                      >
                        はい、同意して再生する
                      </button>
                      <button 
                         onClick={() => setShowConfirmBox(false)}
                         className="text-slate-500 hover:text-white text-xs py-2"
                      >
                         キャンセル
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {stage === "BILLING" && (
          <motion.div
            key="billing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center p-4 bg-[#050507] z-[500] overflow-y-auto"
          >
            <div className="max-w-lg w-full bg-[#111114] rounded-2xl overflow-hidden shadow-[0_0_150px_rgba(219,39,119,0.1)] border border-slate-800 my-auto">
              <div className="bg-red-700 p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(255,100,100,0.2),transparent)]" />
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full text-red-700 mb-6 shadow-[0_0_40px_rgba(255,255,255,0.3)] relative z-10"
                >
                  <AlertCircle size={56} />
                </motion.div>
                <h2 className="text-3xl font-black text-white relative z-10 tracking-tighter">登録が正式に完了いたしました</h2>
                <p className="text-red-200 text-[11px] mt-2 relative z-10 font-bold opacity-90 uppercase tracking-widest">Membership Activated (ID: {billingData.id.split('-')[1]})</p>
              </div>

              <div className="p-8 md:p-12 space-y-8">
                {/* Invoice Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 p-4 rounded-xl border border-slate-800/50">
                    <p className="text-slate-600 text-[9px] uppercase font-black tracking-widest mb-1.5">注文番号</p>
                    <p className="text-slate-100 font-mono text-sm leading-none">{billingData.id}</p>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-slate-800/50 text-right">
                    <p className="text-slate-600 text-[9px] uppercase font-black tracking-widest mb-1.5">登録日時</p>
                    <p className="text-slate-100 font-mono text-[11px] leading-none">{billingData.time}</p>
                  </div>
                </div>

                <div className="text-center py-4 border-y border-slate-800/50">
                  <p className="text-slate-400 text-[11px] font-bold mb-3">お振込み合計金額をご確認ください</p>
                  <div className="text-5xl font-black text-white flex items-baseline justify-center gap-1 group">
                    <span className="text-2xl text-pink-600">￥</span>98,000 <span className="text-xs text-slate-500 font-normal self-end mb-2">(税込)</span>
                  </div>
                  <div className="inline-block mt-4 bg-red-600/10 text-red-500 text-[9px] font-black px-4 py-1.5 rounded-full border border-red-900/30 animate-pulse">
                    ※お支払い期限残り：{formatTimer(timer).split(' ')[1]} {formatTimer(timer).split(' ')[2]}
                  </div>
                </div>

                {/* Intense System Info */}
                <div className="bg-[#1a1a1e] p-6 rounded-2xl space-y-4 border border-slate-800 relative group">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-xs font-black text-amber-500 flex items-center gap-2">
                       <ShieldAlert size={16} /> お客様の環境情報を取得・保存しました
                    </h3>
                    <Smartphone className="text-slate-700 group-hover:text-amber-500 transition-colors" size={20} />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-[10px] font-mono leading-tight">
                    <div className="space-y-1">
                      <p className="text-slate-600 text-[8px] uppercase font-black">接続元IPアドレス</p>
                      <p className="text-amber-200/90">{billingData.ip}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-600 text-[8px] uppercase font-black">使用OS・機種</p>
                      <p className="text-amber-200/90">{systemInfo.platform}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-600 text-[8px] uppercase font-black">使用ブラウザ</p>
                      <p className="text-amber-200/90">{systemInfo.browserName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-600 text-[8px] uppercase font-black">画面設定</p>
                      <p className="text-amber-200/90">{systemInfo.screenRes} ({systemInfo.colorDepth})</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-600 text-[8px] uppercase font-black">Cookie設定 / 言語</p>
                      <p className="text-amber-200/90">{systemInfo.cookiesEnabled} / {systemInfo.language}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-600 text-[8px] uppercase font-black">CPUスレッド数</p>
                      <p className="text-amber-200/90">{systemInfo.logicalProcessors} Threads</p>
                    </div>
                  </div>

                  <div className="bg-red-950/40 p-3 rounded-lg text-[9px] text-red-500 font-bold border border-red-900/40">
                    注意：これらの情報を、電子消費者契約法に基づく「債権回収および法的措置」の証拠として即時にサーバーへ記録しました。
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-slate-100 text-black py-5 rounded-xl font-black hover:bg-white transition-all shadow-2xl text-sm"
                    onClick={handlePaymentClick}
                  >
                    コンビニでの支払い方法を確認する
                    <p className="text-[9px] font-normal opacity-60">※支払い期限が過ぎると延滞金が発生します</p>
                  </motion.button>
                  <div className="flex justify-center items-center gap-3 py-4">
                     <Clock size={16} className="text-pink-600" />
                     <span className="text-xs font-mono font-black text-pink-600 uppercase">TIME REMAINING: {formatTimer(timer)}</span>
                  </div>
                </div>
              </div>

              {showExplanation && (
                <div className="bg-amber-400 text-amber-950 p-8 border-t-[10px] border-amber-600">
                  <h3 className="font-black text-xl mb-4 flex items-center gap-2">
                    <TriangleAlert size={26} /> なぜ「払わなきゃ」と思ってしまうのか？
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white/40 p-4 rounded-lg border border-amber-500">
                       <p className="text-xs leading-relaxed">
                         <strong>1. 権威の偽装:</strong> 「電子消費者契約法」「法的手続き」などの難解な用語を使い、正当な請求であると錯覚させます。実際には、規約を隠している時点で契約は無効です。
                       </p>
                    </div>
                    <div className="bg-white/40 p-4 rounded-lg border border-amber-500">
                       <p className="text-xs leading-relaxed">
                         <strong>2. 情報露呈の恐怖:</strong> 表示されたOSやIPアドレスを「自分の正体の一部」と感じ、相手が自分の名前や住所まで知っていると勘違いさせます。実際にはこれだけで名前はわかりません。
                       </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {stage === "REFLECTION" && (
          <motion.div
            key="reflection"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-[600] bg-slate-950 overflow-y-auto p-4 md:p-10"
          >
            <div className="max-w-4xl mx-auto space-y-12 pb-20">
              <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600/20 text-green-500 rounded-full mb-4">
                   <ShieldAlert size={48} />
                </div>
                <h2 className="text-4xl font-black text-white tracking-tighter">【授業用：まとめ】詐欺の手口を振り返る</h2>
                <p className="text-slate-400">今の恐怖感、焦燥感こそが詐欺師の狙いです。冷静に振り返りましょう。</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Point 1 */}
                 <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-600/50 transition-colors">
                    <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-lg flex items-center justify-center mb-6">
                       <MousePointer2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">1. クリック一回の重み</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                       最近の詐欺は、再生ボタンそのものに「同意」のリンクを重ねます。さらに、今回のデモのように「確認ダイアログ」を挟むことで、「自分でOKを押した」という心理的な負い目を作り出します。
                    </p>
                 </div>

                 {/* Point 2 */}
                 <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-600/50 transition-colors">
                    <div className="w-12 h-12 bg-pink-600/20 text-pink-400 rounded-lg flex items-center justify-center mb-6">
                       <Calendar size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">2. 見えない規約の罠</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                       あえて遥か下にスクロールしなければ見えない場所に規約を置くのは、後で「書いてあった」と言い張るためです。しかし、常識的な範囲で確認できない規約は、契約として認められません。
                    </p>
                 </div>

                 {/* Point 3 */}
                 <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-600/50 transition-colors">
                    <div className="w-12 h-12 bg-amber-600/20 text-amber-400 rounded-lg flex items-center justify-center mb-6">
                       <Monitor size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">3. 公開情報の悪用</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                       IPアドレスやOSなどは、ブラウザがサイトを表示する際に必ず通知する情報です。詐欺師はこれを「あたかも個人を特定した」かのように見せかけます。絶対に一人で悩まず、無視するか専門家へ。
                    </p>
                 </div>

                 {/* Point 4 */}
                 <div className="bg-slate-100 text-slate-900 p-8 rounded-2xl border border-white">
                    <h3 className="text-xl font-black mb-4">被害に遭った時のアクション</h3>
                    <ul className="space-y-4">
                       <li className="flex items-start gap-2">
                         <ArrowRightCircle className="mt-1 flex-shrink-0" size={16} />
                         <div>
                            <p className="font-bold">絶対に連絡・支払いをしない</p>
                            <p className="text-xs opacity-70">一度払うと「カモ」としてさらに請求されます。</p>
                         </div>
                       </li>
                       <li className="flex items-start gap-2">
                         <ArrowRightCircle className="mt-1 flex-shrink-0" size={16} />
                         <div>
                            <p className="font-bold">消費者ホットライン「188」に相談</p>
                            <p className="text-xs opacity-70">公的な窓口で適切なアドバイスが受けられます。</p>
                         </div>
                       </li>
                       <li className="flex items-start gap-2">
                         <ArrowRightCircle className="mt-1 flex-shrink-0" size={16} />
                         <div>
                            <p className="font-bold">スクリーンショットのみ残して無視</p>
                            <p className="text-xs opacity-70">証拠として保存し、ブラウザを閉じましょう。</p>
                         </div>
                       </li>
                    </ul>
                 </div>
              </div>

              <div className="text-center pt-10">
                <button 
                   onClick={() => { setStage("PORTAL"); setPaymentClickCount(0); setShowConfirmBox(false); }}
                   className="bg-slate-800 hover:bg-slate-700 text-white px-10 py-4 rounded-full font-bold transition-all"
                >
                  最初に戻って再体験する
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Disclaimer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-slate-900 p-2 text-center text-[8px] md:text-[10px] text-slate-600 z-[250] flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
         <span>Copyright © 2026 ネットリテラシー向上特別教材</span>
         <span className="text-slate-400">※このサイトはデモ用です。個人情報送信や振込は一切不要です。</span>
         <span className="text-pink-800 hidden md:inline">#OneClickFraudSimulator_V2</span>
      </footer>
    </div>
  );
}
