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

type Stage = "PORTAL" | "PLAYBACK" | "PROCESSING" | "BILLING" | "REFLECTION";

export default function App() {
  const [stage, setStage] = useState<Stage>("PORTAL");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [paymentClickCount, setPaymentClickCount] = useState(0);
  const [timer, setTimer] = useState(3 * 24 * 60 * 60);
  const [processingProgress, setProcessingProgress] = useState(0);

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
    if (ua.indexOf("Windows NT 10.0") !== -1) os = "Windows 10/11";
    else if (ua.indexOf("Windows NT 6.3") !== -1) os = "Windows 8.1";
    else if (ua.indexOf("Windows NT 6.2") !== -1) os = "Windows 8";
    else if (ua.indexOf("Windows NT 6.1") !== -1) os = "Windows 7";
    else if (ua.indexOf("Mac OS X") !== -1) os = "macOS";
    else if (ua.indexOf("iPhone") !== -1) os = "iPhone (iOS)";
    else if (ua.indexOf("iPad") !== -1) os = "iPad (iPadOS)";
    else if (ua.indexOf("Android") !== -1) {
      const match = ua.match(/Android\s([0-9\.]+)/);
      os = match ? `Android ${match[1]}` : "Android OS";
    }
    else if (ua.indexOf("Linux") !== -1) os = "Linux";

    setSystemInfo({
      userAgent: navigator.userAgent,
      platform: os,
      language: navigator.language === "ja" ? "日本語 (ja)" : navigator.language,
      screenRes: `${window.screen.width} x ${window.screen.height}`,
      colorDepth: `${window.screen.colorDepth}-bit`,
      logicalProcessors: navigator.hardwareConcurrency || "4",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cookiesEnabled: navigator.cookieEnabled ? "有効 (Enabled)" : "無効 (Disabled)",
      referrer: document.referrer || "直接アクセス / ブックマーク (Direct)",
      browserName: ua.indexOf("Edg/") !== -1 ? "Microsoft Edge" : ua.indexOf("Chrome/") !== -1 ? "Google Chrome" : ua.indexOf("Firefox/") !== -1 ? "Firefox" : ua.indexOf("Safari/") !== -1 ? "Safari" : "不明なブラウザ",
      // Add requested scary server info
      remoteHost: "ocn-v6-dynamic-ppp-122-215-xxx.jp.tokyo.mesh.ad.jp",
      remoteAddr: billingData.ip,
      httpReferer: document.referrer || "https://sns-shady-ad-network.com/click?id=882",
      httpAcceptEncoding: "gzip, deflate, br, zstd",
      httpAccept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      httpAcceptLanguage: "ja,en-US;q=0.9,en;q=0.8",
      httpUserAgent: navigator.userAgent,
      httpHost: "premium-video-neo.jp",
      httpConnection: "keep-alive",
      httpSecFetchSite: "same-origin",
      httpSecChUaMobile: "?0",
      httpUpgradeInsecureRequests: "1",
      httpSecFetchMode: "navigate",
      httpSecFetchDest: "document",
      httpSecFetchUser: "?1",
      httpSecChUaPlatform: `"${os.split(' ')[0]}"`,
      httpSecChUa: '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"'
    });
  }, [billingData.ip]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Artificial Delay Logic for Stage PROCESSING
  useEffect(() => {
    if (stage === "PROCESSING") {
      const duration = 2800; // 2.8 seconds
      const startTime = Date.now();
      
      const updateInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        setProcessingProgress(progress);
        
        if (progress >= 100) {
          clearInterval(updateInterval);
          setStage("BILLING");
        }
      }, 50);
      
      return () => clearInterval(updateInterval);
    }
  }, [stage]);

  const formatTimer = (seconds: number) => {
    const d = Math.floor(seconds / (24 * 3600));
    const h = Math.floor((seconds % (24 * 3600)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      full: `${d}日 ${h}時間 ${m}分 ${s}秒`,
      hms: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    };
  };

  const handlePaymentClick = () => {
    const newCount = paymentClickCount + 1;
    setPaymentClickCount(newCount);
    if (newCount >= 2) {
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
                               {i === 1 ? "深夜の放送事故！あの人気モデルが自宅で..." : i === 2 ? "【流出】大手企業の受付嬢、秘密の放課後" : "絶対に見てはいけない禁断の10秒間"}
                             </p>
                             <p className="text-[8px] text-slate-600 mt-1">{(120 - i * 10).toLocaleString()} views</p>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Shady Sidebar Ad */}
                <div className="bg-gradient-to-br from-amber-600/20 to-red-600/20 border border-amber-500/30 rounded p-4 cursor-pointer hover:from-amber-600/30 transition-all">
                   <div className="flex items-center gap-2 mb-2">
                     <Zap size={14} className="text-amber-500" fill="currentColor" />
                     <span className="text-[10px] font-black text-amber-500">SPONSORED</span>
                   </div>
                   <p className="text-[11px] font-bold text-white mb-2 leading-tight">
                     スマホ1台で月収50万円！？<br/>
                     知識不要の次世代副業を今すぐチェック
                   </p>
                   <button className="w-full bg-amber-600 text-white text-[9px] font-black py-1 rounded">詳細を見る</button>
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
                        <span className="absolute bottom-1 right-1 bg-black/70 text-[8px] px-1 font-mono text-white tracking-widest">{10 + i}:{20 + i}</span>
                        <div className="absolute top-1 left-1 bg-gradient-to-r from-red-600 to-pink-600 text-[8px] px-1.5 font-bold italic rounded-sm shadow-lg">PREMIUM</div>
                      </div>
                      <div className="p-2.5">
                        <p className="text-[11px] font-black leading-tight line-clamp-2 min-h-[2.2rem] group-hover:text-pink-400">
                          {i % 3 === 0 ? "【衝撃映像】街角で声をかけた女子大生がまさかの展開に..." : i % 3 === 1 ? "絶対に笑ってはいけない深夜のハプニングまとめ100連発！" : "【独占】元アイドルMの極秘ビデオが流出！？"}
                        </p>
                        <div className="flex justify-between items-center text-[8px] text-slate-500 mt-2">
                          <span className="flex items-center gap-1"><Monitor size={8} /> 4k Ultra HD</span>
                          <span className="text-slate-400">{(i + 1) * 2}日前 ｜ {(i + 1) * 4.2}k view</span>
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
                        onClick={() => {
                          setShowConfirmBox(false);
                          setStage("PROCESSING");
                        }}
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

        {stage === "PROCESSING" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center p-4 bg-[#050507] z-[600]"
          >
             <div className="max-w-md w-full space-y-8">
                <div className="text-center space-y-4">
                   <motion.div
                     animate={{ rotate: 360 }}
                     transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                     className="inline-block w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full"
                   />
                   <h2 className="text-xl font-black text-white tracking-widest animate-pulse">端末情報を照合中...</h2>
                </div>

                <div className="bg-black border border-slate-800 p-6 rounded-lg space-y-4">
                   <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-mono text-slate-500">SYSTEM_EXTRACTION_LINK</span>
                      <span className="text-xs font-mono text-pink-500">{Math.floor(processingProgress)}%</span>
                   </div>
                   <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${processingProgress}%` }}
                        className="h-full bg-pink-600"
                      />
                   </div>
                   <div className="bg-black/50 p-3 font-mono text-[9px] text-slate-400 space-y-1">
                      <p className="flex justify-between"><span>&gt; Fetching IP:</span> <span className="text-amber-500">{billingData.ip}</span></p>
                      <p className="flex justify-between"><span>&gt; Fingerprinting OS:</span> <span className="text-indigo-400">{systemInfo.platform}</span></p>
                      <p className="flex justify-between"><span>&gt; Tracking Referral:</span> <span className="text-slate-500 truncate">{systemInfo.httpHost}</span></p>
                      <p className="flex justify-between"><span>&gt; Saving Cloud Evidence:</span> <span className="text-green-500">READY</span></p>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {stage === "BILLING" && (
          <motion.div
            key="billing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center p-4 bg-[#050507] z-[500] overflow-y-auto"
          >
            <div className="max-w-2xl w-full bg-[#111114] rounded-2xl overflow-hidden shadow-[0_0_200px_rgba(219,39,119,0.2)] border-2 border-red-900/40 my-auto">
              <div className="bg-red-700 py-12 px-6 text-center relative overflow-hidden border-b border-red-900/50">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(255,100,100,0.3),transparent)]" />
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="inline-flex items-center justify-center w-28 h-28 bg-white rounded-full text-red-700 mb-8 shadow-[0_0_60px_rgba(255,255,255,0.4)] relative z-10"
                >
                  <AlertCircle size={64} strokeWidth={2.5} />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black text-white relative z-10 tracking-tighter mb-4">ご登録が完了しました</h2>
                <p className="text-red-100 text-sm md:text-base relative z-10 font-bold opacity-90 uppercase tracking-[0.2em]">Transaction ID: {billingData.id.split('-')[1]}</p>
              </div>

              <div className="p-8 md:p-14 space-y-10">
                {/* Invoice Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-black/60 p-6 rounded-xl border border-slate-800/80">
                    <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2 text-center sm:text-left">管理番号 (Order ID)</p>
                    <p className="text-slate-100 font-mono text-xl text-center sm:text-left leading-none tracking-tight">{billingData.id}</p>
                  </div>
                  <div className="bg-black/60 p-6 rounded-xl border border-slate-800/80">
                    <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2 text-center sm:text-right">登録日時 (Timestamp)</p>
                    <p className="text-slate-100 font-mono text-lg text-center sm:text-right leading-none">{billingData.time}</p>
                  </div>
                </div>

                <div className="text-center py-8 border-y border-slate-800/50 bg-gradient-to-r from-transparent via-slate-900/30 to-transparent">
                  <p className="text-slate-400 text-sm font-bold mb-4">請求金額合計 (Initial Payment)</p>
                  <div className="text-6xl md:text-7xl font-black text-white flex items-baseline justify-center gap-2 group">
                    <span className="text-3xl text-pink-600">￥</span>98,000 <span className="text-sm text-slate-500 font-normal self-end mb-3">(税込)</span>
                  </div>
                  
                  {/* Aggressive Deadline Emphasis */}
                  <div className="mt-8 space-y-3">
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: "100%" }}
                         animate={{ width: "0%" }}
                         transition={{ duration: 3 * 24 * 60 * 60, ease: "linear" }}
                         className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                       />
                    </div>
                    <div className="flex flex-col items-center">
                       <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">支払い期限残り (Time Remaining)</p>
                       <p className="text-3xl md:text-5xl font-mono font-black text-red-600 tabular-nums tracking-wider drop-shadow-[0_0_10px_rgba(220,38,38,0.3)] animate-pulse">
                         {formatTimer(timer).hms}
                       </p>
                       <p className="text-[10px] text-slate-500 mt-2 font-bold">{formatTimer(timer).full}</p>
                    </div>
                  </div>
                </div>

                {/* Highly Visible System Info */}
                <div className="bg-[#1a1a1e] p-8 rounded-2xl space-y-6 border border-slate-800 relative group shadow-inner">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-base font-black text-amber-500 flex items-center gap-3">
                       <ShieldAlert size={20} className="animate-bounce" /> 端末およびネットワーク情報の記録
                    </h3>
                    <Monitor className="text-slate-700 group-hover:text-amber-500 transition-colors" size={24} />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-sm font-mono leading-relaxed">
                    <div className="space-y-1.5">
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">接続元IPアドレス (Your IP)</p>
                      <p className="text-amber-200 text-lg font-bold underline decoration-amber-500/30">{billingData.ip}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">現在地候補 / Timezone</p>
                      <p className="text-amber-200 text-base">{systemInfo.timezone}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">使用デバイス (Detected OS)</p>
                      <p className="text-amber-100 text-base font-black">{systemInfo.platform}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">使用ブラウザ (Browser)</p>
                      <p className="text-amber-100 text-base">{systemInfo.browserName}</p>
                    </div>
                    <div className="sm:col-span-2 space-y-1.5 bg-black/30 p-4 rounded-lg border border-slate-800/50">
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">アクセス経路 (Referrer Info)</p>
                      <div className="text-indigo-300 text-xs font-bold flex items-center gap-2">
                        <Globe size={14} className="flex-shrink-0" />
                        <span className="break-all">{systemInfo.referrer}</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">画面解像度</p>
                      <p className="text-slate-400 text-base">{systemInfo.screenRes}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">Cookieステータス</p>
                      <p className="text-slate-400 text-base">{systemInfo.cookiesEnabled}</p>
                    </div>

                    <div className="sm:col-span-2 mt-4 space-y-4">
                      <div className="bg-black/80 p-6 rounded-xl border border-red-900/30 font-mono text-[9px] text-slate-400 overflow-x-auto leading-relaxed">
                        <p className="text-red-500 font-black mb-3 text-xs border-b border-red-900/40 pb-1">SERVER_ENVIRONMENT_DUMP</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                          <div className="flex gap-2">
                             <span className="text-indigo-400/80 min-w-[140px] flex-shrink-0">REMOTE_HOST:</span>
                             <span className="text-amber-100/60 break-all">{systemInfo.remoteHost}</span>
                          </div>
                          <div className="flex gap-2">
                             <span className="text-indigo-400/80 min-w-[140px] flex-shrink-0">REMOTE_ADDR:</span>
                             <span className="text-amber-200 font-bold">{billingData.ip}</span>
                          </div>
                          <div className="flex gap-2">
                             <span className="text-indigo-400/80 min-w-[140px] flex-shrink-0">HTTP_REFERER:</span>
                             <span className="text-slate-500 break-all">{systemInfo.httpReferer}</span>
                          </div>
                          <div className="flex gap-2">
                             <span className="text-indigo-400/80 min-w-[140px] flex-shrink-0">HTTP_USER_AGENT:</span>
                             <span className="text-slate-500 italic break-all truncate">{systemInfo.httpUserAgent}</span>
                          </div>
                          <div className="flex gap-2">
                             <span className="text-indigo-400/80 min-w-[140px] flex-shrink-0">HTTP_ACCEPT_LANG:</span>
                             <span className="text-slate-500">{systemInfo.httpAcceptLanguage}</span>
                          </div>
                          <div className="flex gap-2">
                             <span className="text-indigo-400/80 min-w-[140px] flex-shrink-0">HTTP_SEC_CH_UA:</span>
                             <span className="text-slate-500">{systemInfo.httpSecChUa}</span>
                          </div>
                        </div>
                        <p className="mt-4 text-[8px] text-red-500/50 italic font-bold">※これらのヘッダー情報は、サーバーとの接続時に自動的にログへ記録されています。</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-950/60 p-5 rounded-xl text-xs text-red-400 font-bold border border-red-900/60 leading-relaxed shadow-lg">
                    【警告】当サイトは「電子消費者契約法」に基づき、上記情報を法的手続き（プロバイダへの開示請求および住所特定）の証拠として即時に保存しました。
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.button 
                    whileTap={{ scale: 0.96 }}
                    className="w-full bg-slate-100 text-black py-6 rounded-2xl font-black hover:bg-white transition-all shadow-[0_10px_40px_rgba(255,255,255,0.1)] text-lg flex flex-col items-center gap-1"
                    onClick={handlePaymentClick}
                  >
                    <span>お支払い手続きへ進む</span>
                    <span className="text-xs font-normal opacity-60">※期限超過後、事務手数料加算の対象となります</span>
                  </motion.button>
                  <div className="flex justify-center items-center gap-4 py-4 bg-slate-900/30 rounded-xl">
                     <Clock size={20} className="text-pink-600 animate-pulse" />
                     <span className="text-sm font-mono font-black text-pink-100 uppercase tracking-widest">最終支払い期限: {formatTimer(timer).full}</span>
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[600] bg-[#070709] overflow-y-auto p-6 md:p-16"
          >
            <div className="max-w-5xl mx-auto space-y-16 pb-32">
              <header className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-600/10 text-green-500 rounded-2xl mb-4 border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                   <ShieldAlert size={56} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">【学習用まとめ】<br className="md:hidden" />詐欺の手口を振り返る</h2>
                <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                   「恐怖」「焦燥」「負い目」こそが詐欺師の武器です。<br />
                   体験した一連の流れを、冷静に分析しましょう。
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {/* Point 1 */}
                 <div className="bg-slate-900/40 p-10 rounded-3xl border border-slate-800 hover:border-green-600/40 transition-all duration-500 group shadow-lg">
                    <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                       <MousePointer2 size={32} />
                    </div>
                    <h3 className="text-2xl font-black mb-6 text-white tracking-tight">1. 「誘導」と「追認」の巧妙な罠</h3>
                    <p className="text-base text-slate-400 leading-relaxed">
                       再生ボタンそのものが「同意」のスイッチになっていました。さらに、年齢確認などで「自分でOKを押した」という事実を積み重ねさせることで、「自分が悪いから払わなければ」という心理的な負い目を植え付けます。
                    </p>
                 </div>

                 {/* Point 2 */}
                 <div className="bg-slate-900/40 p-10 rounded-3xl border border-slate-800 hover:border-green-600/40 transition-all duration-500 group shadow-lg">
                    <div className="w-16 h-16 bg-pink-600/20 text-pink-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                       <Calendar size={32} />
                    </div>
                    <h3 className="text-2xl font-black mb-6 text-white tracking-tight">2. 「見えない規約」による既成事実化</h3>
                    <p className="text-base text-slate-400 leading-relaxed">
                       通常ではたどり着けないほど下に規約を隠すのは、「書いてあった」という言い訳を作るためです。しかし、法的には容易に確認できない規約は合意とみなされず、契約は不成立（無効）となります。
                    </p>
                 </div>

                 {/* Point 3 */}
                 <div className="bg-slate-900/40 p-10 rounded-3xl border border-slate-800 hover:border-green-600/40 transition-all duration-500 group shadow-lg">
                    <div className="w-16 h-16 bg-amber-600/20 text-amber-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                       <Monitor size={32} />
                    </div>
                    <h3 className="text-2xl font-black mb-6 text-white tracking-tight">3. 「公開情報」を「個人情報」に見せる</h3>
                    <p className="text-base text-slate-400 leading-relaxed">
                       IPアドレスやOS情報は、ブラウザがサイトを表示するために自動で送信する公開データです。詐欺師はこれを表示することで「正体を完全に特定した」と錯覚させます。これだけで住所や氏名がバレることはありません。
                    </p>
                 </div>

                 {/* Point 4 */}
                 <div className="bg-white text-slate-950 p-10 rounded-3xl shadow-[0_20px_50px_rgba(255,255,255,0.05)] border border-white/20">
                    <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                       <ShieldAlert className="text-red-600" /> 被害に遭った時のアクション
                    </h3>
                    <ul className="space-y-6">
                       <li className="flex items-start gap-4">
                         <div className="mt-1.5 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                            <ArrowRightCircle className="text-red-600" size={16} />
                         </div>
                         <div>
                            <p className="text-lg font-black tracking-tight">絶対に連絡・支払いをしない</p>
                            <p className="text-sm opacity-70 mt-1 leading-relaxed">一度でも払うと「カモ」として認識され、さらなる高額請求のリストに載ってしまいます。</p>
                         </div>
                       </li>
                       <li className="flex items-start gap-4">
                         <div className="mt-1.5 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <ArrowRightCircle className="text-blue-600" size={16} />
                         </div>
                         <div>
                            <p className="text-lg font-black tracking-tight">消費者ホットライン「188」に相談</p>
                            <p className="text-sm opacity-70 mt-1 leading-relaxed">最寄りの消費生活センターにつながります。法的アドバイスを無料で受けることが可能です。</p>
                         </div>
                       </li>
                       <li className="flex items-start gap-4">
                         <div className="mt-1.5 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                            <ArrowRightCircle className="text-slate-600" size={16} />
                         </div>
                         <div>
                            <p className="text-lg font-black tracking-tight">無視してブラウザを閉じる</p>
                            <p className="text-sm opacity-70 mt-1 leading-relaxed">請求画面が出続ける場合は、ブラウザのキャッシュを削除するかタブを閉じるだけで解決します。</p>
                         </div>
                       </li>
                    </ul>
                 </div>
              </div>

              <div className="text-center pt-10">
                <button 
                   onClick={() => { setStage("PORTAL"); setPaymentClickCount(0); setShowConfirmBox(false); }}
                   className="bg-slate-800 hover:bg-slate-700 hover:scale-105 active:scale-95 text-white px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl border border-slate-700"
                >
                  トップページに戻って再体験する
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
