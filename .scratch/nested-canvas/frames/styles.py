"""Token + CSS cho 3 hướng thị giác. Dùng bởi build_frames.py.

Quy ước chung (đã chốt):
- Một accent duy nhất: cornflower #4C9EEB với chữ tối #0B1220 (6.6:1).
- Be Vietnam Pro cho toàn bộ.
- Không gradient, không dùng chữ trắng trên accent.
- Bo góc chỉ 8/12/16/full.
"""

from string import Template

BASE_CSS = Template(
    r"""
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff}
body{font-family:'Be Vietnam Pro',-apple-system,'Segoe UI',sans-serif;color:$ink;font-size:$body_size;
  line-height:1.5;-webkit-font-smoothing:antialiased;font-feature-settings:'kern' 1}
.screen{width:1440px;height:900px;overflow:hidden;background:$bg;color:$ink;position:relative}
.screen.dark,.phone.dark{
  --bg:#0B111C;--surface:#141D2B;--surface2:#1B2636;--surface3:#212D3F;
  --line:#0B111C;--line-soft:#26313F;--ink:#E8EEF6;--ink2:#A9B8CB;--ink3:#8CA0B8;
  --sel-bg:#1D2A3C;--bubble-in:#1B2636;--bubble-in-ink:#E8EEF6;--thread-bg:#0E1522;--rail-bg:#0B111C;
}
.screen.dark .seg>span.on,.phone.dark .seg>span.on{background:#2A384C;box-shadow:none;color:#E8EEF6}
.app{display:flex;height:100%;width:100%}

/* ── rail ───────────────────────────────────────────── */
.rail{width:72px;flex:0 0 72px;display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 0;
  background:$rail_bg;border-right:1px solid $line_soft;z-index:2}
.rail-logo{width:40px;height:40px;border-radius:$r_md;background:$accent;color:$on_accent;display:flex;
  align-items:center;justify-content:center;font-weight:800;font-size:19px;margin-bottom:12px;flex:0 0 auto}
.rail-btn{width:44px;height:44px;border-radius:$r_md;display:flex;align-items:center;justify-content:center;
  color:$rail_ink;position:relative;flex:0 0 auto}
.rail-btn.on{background:$rail_active_bg;color:$rail_active_ink}
.rail-badge{position:absolute;top:5px;right:5px;min-width:16px;height:16px;border-radius:999px;background:$accent;
  color:$on_accent;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 4px;
  border:2px solid $rail_bg}
.rail-spacer{flex:1}
.rail-av{width:34px;height:34px;border-radius:999px;background:#8FA9C6;color:#fff;font-size:11.5px;font-weight:700;
  display:flex;align-items:center;justify-content:center;flex:0 0 auto;margin-top:4px}

/* ── list panel ─────────────────────────────────────── */
.panel{width:320px;flex:0 0 320px;background:$surface;display:flex;flex-direction:column;min-height:0;
  border-right:1px solid $line_soft}
.panel-head{padding:18px 16px 10px;display:flex;align-items:center;justify-content:space-between;gap:8px}
.panel-title{font-size:21px;font-weight:var(--fw-display);letter-spacing:-.015em;line-height:1.2}
.icon-btn{width:34px;height:34px;border-radius:$r_sm;display:flex;align-items:center;justify-content:center;
  color:$ink2;background:transparent;border:0;flex:0 0 auto}
.icon-btn.accent{background:$accent;color:$on_accent}
.search{display:flex;align-items:center;gap:8px;height:40px;border-radius:$r_sm;background:$surface2;
  padding:0 12px;color:$ink3;font-size:13px;margin:2px 16px 10px;border:1px solid transparent}
.seg{display:flex;gap:3px;margin:0 16px 8px;padding:3px;border-radius:$r_sm;background:$surface2}
.seg>span{flex:1;text-align:center;font-size:12px;font-weight:600;padding:6px 0;border-radius:8px;color:$ink3;
  white-space:nowrap}
.seg>span.on{background:$seg_on_bg;color:$seg_on_ink;box-shadow:$seg_on_shadow}
.seg .cnt{font-size:11px;opacity:.7;margin-left:3px}
.section-label{padding:12px 18px 5px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:$ink3;display:flex;justify-content:space-between;align-items:center}
.conv{display:flex;gap:10px;align-items:center;padding:9px 12px;margin:0 6px;border-radius:$r_sm;position:relative;
  border-bottom:1px solid var(--conv-line,transparent)}
.conv.on{background:$sel_bg}
.conv-body{flex:1;min-width:0}
.conv-top{display:flex;align-items:baseline;gap:6px}
.conv-name{font-size:13.5px;font-weight:600;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.conv-time{font-size:11px;color:$ink3;font-variant-numeric:tabular-nums;flex:0 0 auto}
.conv-prev{font-size:12.5px;color:$ink3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:1px}
.conv-prev b{color:$ink2;font-weight:600}
.badge{min-width:18px;height:18px;border-radius:999px;background:$accent;color:$on_accent;font-size:10px;
  font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 5px;font-variant-numeric:tabular-nums}

/* ── avatar ─────────────────────────────────────────── */
.av{width:40px;height:40px;border-radius:999px;background:var(--av,#8FA9C6);color:#fff;display:flex;
  align-items:center;justify-content:center;font-size:13px;font-weight:700;flex:0 0 auto;position:relative;
  letter-spacing:.01em}
.av.sm{width:32px;height:32px;font-size:11px}
.av.md{width:44px;height:44px;font-size:14px}
.av.lg{width:52px;height:52px;font-size:17px}
.av.xl{width:104px;height:104px;font-size:32px}
.av.sq{border-radius:$r_md}
.dot{position:absolute;right:0;bottom:0;width:11px;height:11px;border-radius:999px;background:#22C55E;
  border:2px solid $surface}

/* ── main / thread ──────────────────────────────────── */
.main{flex:1;min-width:0;display:flex;flex-direction:column;background:$surface;position:relative}
.thread-head{height:64px;flex:0 0 64px;display:flex;align-items:center;gap:12px;padding:0 16px;
  border-bottom:1px solid $line_soft;background:$surface;position:relative;z-index:1}
.thread-name{font-size:14.5px;font-weight:700;line-height:1.25}
.thread-sub{font-size:11.5px;color:$ink3;line-height:1.3;margin-top:1px}
.thread-actions{margin-left:auto;display:flex;gap:2px;align-items:center}
.msgs{flex:1;overflow:hidden;padding:18px 22px 8px;display:flex;flex-direction:column;gap:10px;
  background:$thread_bg;justify-content:flex-end}
.date-chip{align-self:center;font-size:10.5px;font-weight:600;color:$ink3;background:$surface2;padding:3px 10px;
  border-radius:999px;margin-bottom:2px}
.msg{display:grid;grid-template-columns:32px minmax(0,1fr);gap:8px;width:100%;align-items:end}
.msg.me{grid-template-columns:minmax(0,1fr) 0px}
.msg.me .msg-col{grid-column:1;grid-row:1;justify-self:end}
.msg.cont{grid-template-columns:32px minmax(0,1fr)}
.msg-col{display:flex;flex-direction:column;align-items:flex-start;min-width:0;max-width:78%}
.msg.me .msg-col{align-items:flex-end}
.bubble{background:$bubble_in;color:$bubble_in_ink;padding:8px 11px;border-radius:$r_lg;
  border-bottom-left-radius:5px;font-size:13.5px;line-height:1.5;position:relative;border:1px solid $line_soft}
.msg.me .bubble{background:$accent;color:$on_accent;border-color:$accent_edge;border-bottom-left-radius:$r_lg;
  border-bottom-right-radius:5px}
.bubble .sender{font-size:11px;font-weight:700;color:$accent_ink;margin-bottom:2px}
.bubble .time{font-size:9.5px;opacity:.6;margin-left:8px;white-space:nowrap;float:right;margin-top:6px}
.quote{border-left:2px solid currentColor;font-size:11.5px;padding-left:7px;margin-bottom:5px;opacity:.62;
  display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:230px}
.msg.me .quote{border-left-color:$on_accent}
.typing{display:flex;gap:3px;align-items:center;padding:9px 12px;background:$bubble_in;border-radius:$r_lg;
  border-bottom-left-radius:5px;width:fit-content}
.typing i{width:5px;height:5px;border-radius:999px;background:$ink3;display:block;opacity:.55}
.composer{flex:0 0 auto;background:$surface;border-top:1px solid $line_soft;padding:10px 14px 12px}
.reply-bar{display:flex;align-items:center;gap:8px;border-left:2px solid $accent;background:$surface2;
  padding:5px 8px;border-radius:6px;margin-bottom:8px;font-size:11.5px;color:$ink2}
.reply-bar b{font-weight:600}
.composer-row{display:flex;align-items:center;gap:6px}
.composer-input{flex:1;height:42px;border-radius:$r_md;background:$surface2;border:1px solid $line_soft;
  display:flex;align-items:center;padding:0 12px;color:$ink3;font-size:13px}
.send-btn{width:40px;height:40px;border-radius:$r_md;background:$accent;color:$on_accent;display:flex;
  align-items:center;justify-content:center;flex:0 0 auto}

/* ── details panel ──────────────────────────────────── */
.aux{width:360px;flex:0 0 360px;background:$surface;border-left:1px solid $line_soft;display:flex;
  flex-direction:column;min-height:0}
.aux-head{height:56px;flex:0 0 56px;display:flex;align-items:center;justify-content:space-between;
  padding:0 14px 0 18px;border-bottom:1px solid $line_soft}
.aux-title{font-size:14px;font-weight:700}
.tabs{display:flex;gap:2px;padding:0 8px;border-bottom:1px solid $line_soft;flex:0 0 auto}
.tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 0 7px;font-size:10px;
  font-weight:600;color:$ink3;border-bottom:2px solid transparent;margin-bottom:-1px}
.tab.on{color:$accent_ink;border-bottom-color:$accent}
.aux-body{flex:1;overflow:hidden;padding:14px 16px;display:flex;flex-direction:column;gap:12px}
.group-card{display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;
  padding-bottom:14px;border-bottom:1px solid $line_soft}
.group-name{font-size:14.5px;font-weight:700;margin-top:2px}
.group-sub{font-size:11.5px;color:$ink3}
.quick{display:flex;gap:8px;width:100%;margin-top:4px}
.quick>div{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:10.5px;color:$ink2;
  background:$surface2;border-radius:$r_sm;padding:8px 0;border:1px solid $line_soft}
.mini-label{font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:$ink3;
  display:flex;justify-content:space-between;align-items:center}
.member{display:flex;align-items:center;gap:9px;padding:5px 0;font-size:12.5px}
.member .role{margin-left:auto;font-size:10px;font-weight:600;color:$ink3;background:$surface2;padding:1px 6px;
  border-radius:999px}
.member .name{font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.media-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.media{background:$media_bg;border-radius:$r_sm;display:flex;align-items:center;justify-content:center;
  color:$media_ink;border:1px solid $line_soft;overflow:hidden}
.media.sq{aspect-ratio:1}
.action-row{display:flex;align-items:center;gap:9px;padding:9px 0;font-size:12.5px;color:$ink;
  border-top:1px solid $line_soft}
.action-row.danger{color:#C0342B}
.action-row .right{margin-left:auto;color:$ink3}

/* ── feed ───────────────────────────────────────────── */
.feed-wrap{flex:1;display:flex;gap:24px;padding:20px 28px;background:$bg;overflow:hidden;justify-content:center}
.feed-col{width:640px;flex:0 0 640px;display:flex;flex-direction:column;gap:14px;min-width:0}
.page-title{font-size:24px;font-weight:var(--fw-display);letter-spacing:-.02em;margin-bottom:2px}
.rail-right{width:320px;flex:0 0 320px;display:flex;flex-direction:column;gap:14px}
.card{background:$surface;border:$card_border;border-radius:$card_radius;box-shadow:$card_shadow;
  overflow:hidden}
.card-pad{padding:$card_pad}
.card-head{display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid $line_soft;
  font-size:12.5px;font-weight:700}
.card-head .count{margin-left:auto;font-size:11px;font-weight:600;color:$ink3}
.composer-card{display:flex;align-items:center;gap:10px;padding:12px 14px}
.composer-fake{flex:1;height:40px;border-radius:999px;background:$surface2;border:1px solid $line_soft;
  display:flex;align-items:center;padding:0 14px;font-size:13px;color:$ink3}
.post-head{display:flex;align-items:center;gap:10px;padding:12px 14px 8px}
.post-name{font-size:13.5px;font-weight:600}
.post-meta{font-size:11px;color:$ink3;display:flex;align-items:center;gap:5px;margin-top:1px}
.post-text{font-size:14px;line-height:1.55;padding:0 14px 10px;color:$ink}
.media-2{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:$line_soft}
.media-2 .media{border-radius:0;border:0;aspect-ratio:4/3}
.post-actions{display:flex;align-items:center;gap:4px;padding:6px 10px;border-top:1px solid $line_soft}
.post-action{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:$ink2;
  padding:7px 10px;border-radius:$r_sm}
.post-reacts{display:flex;align-items:center;gap:5px;padding:7px 14px 0;font-size:11.5px;color:$ink3}
.rc{width:18px;height:18px;border-radius:999px;background:$accent;color:$on_accent;font-size:9px;font-weight:800;
  display:flex;align-items:center;justify-content:center;border:1.5px solid $surface;margin-left:-5px}
.rc:first-child{margin-left:0}
.rc.alt{background:#C0342B}
.mini-row{display:flex;align-items:center;gap:9px;padding:8px 14px;font-size:12.5px}
.mini-row .name{font-weight:600}
.mini-row .meta{font-size:11px;color:$ink3}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;font-size:12.5px;font-weight:600;
  padding:0 14px;height:34px;border-radius:$r_sm;border:1px solid $line_soft;background:$surface;color:$ink;
  white-space:nowrap}
.btn.primary{background:$accent;color:$on_accent;border-color:$accent_edge}
.btn.ghost{background:transparent;border-color:transparent;color:$ink2}
.btn.sm{height:28px;font-size:11.5px;padding:0 10px}
.btn.full{width:100%}
.btn.ink{background:$ink;color:$surface;border-color:$ink}

/* ── profile ────────────────────────────────────────── */
.profile-wrap{flex:1;overflow:hidden;background:$bg}
.cover{height:190px;background:$cover_bg;position:relative;border-bottom:1px solid $line_soft}
.cover-tag{position:absolute;right:16px;bottom:14px;display:flex;align-items:center;gap:6px;font-size:11px;
  font-weight:600;background:$surface;border:1px solid $line_soft;border-radius:999px;padding:5px 10px;color:$ink2}
.profile-head{background:$surface;padding:0 32px 0}
.profile-id{display:flex;align-items:flex-end;gap:18px;margin-top:-52px}
.profile-av{border:4px solid $surface;border-radius:999px;background:$surface}
.profile-names{padding-bottom:10px}
.profile-name{font-size:26px;font-weight:var(--fw-display);letter-spacing:-.02em;line-height:1.15}
.profile-sub{font-size:12.5px;color:$ink3;margin-top:3px;display:flex;gap:12px;align-items:center}
.profile-actions{margin-left:auto;display:flex;gap:8px;padding-bottom:10px}
.profile-tabs{display:flex;gap:20px;margin-top:14px;border-top:1px solid $line_soft}
.ptab{padding:11px 0;font-size:12.5px;font-weight:600;color:$ink3;border-bottom:2px solid transparent;
  margin-bottom:-1px}
.ptab.on{color:$accent_ink;border-bottom-color:$accent}
.profile-body{display:flex;gap:20px;padding:20px 32px;max-width:1200px}
.about-col{width:340px;flex:0 0 340px;display:flex;flex-direction:column;gap:14px}
.info-row{display:flex;align-items:center;gap:9px;font-size:12.5px;color:$ink2;padding:5px 0}
.info-row b{color:$ink;font-weight:600}
.posts-col{flex:1;min-width:0;display:flex;flex-direction:column;gap:14px}

/* ── activity / contacts ────────────────────────────── */
.center-col{flex:1;overflow:hidden;display:flex;justify-content:center;background:$bg;padding:20px 24px}
.center-inner{width:100%;max-width:760px;display:flex;flex-direction:column;gap:12px;min-width:0}
.act-row{display:flex;gap:11px;align-items:flex-start;padding:12px 16px;border-bottom:1px solid $line_soft}
.act-row:last-child{border-bottom:0}
.act-text{font-size:13px;line-height:1.5;flex:1;min-width:0}
.act-text b{font-weight:600}
.act-time{font-size:11px;color:$ink3;margin-top:2px}
.act-actions{display:flex;gap:6px;margin-top:7px}
.unread-dot{width:7px;height:7px;border-radius:999px;background:$accent;margin-top:6px;flex:0 0 auto}
.letter{font-size:10px;font-weight:700;letter-spacing:.1em;color:$ink3;padding:8px 16px 2px;
  text-transform:uppercase;border-bottom:1px solid $line_soft;background:$surface2}
.person-row{display:flex;align-items:center;gap:11px;padding:9px 16px;border-bottom:1px solid $line_soft}
.person-row:last-child{border-bottom:0}
.person-name{font-size:13px;font-weight:600}
.person-meta{font-size:11.5px;color:$ink3;margin-top:1px}
.person-row .btn{margin-left:auto}
.detail-panel{width:320px;flex:0 0 320px;background:$surface;border-left:1px solid $line_soft;padding:20px;
  display:flex;flex-direction:column;gap:12px}
.detail-center{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;
  padding-bottom:14px;border-bottom:1px solid $line_soft}
.detail-name{font-size:16px;font-weight:700;margin-top:6px}
.detail-meta{font-size:11.5px;color:$ink3}
.kv{display:flex;justify-content:space-between;font-size:12px;padding:5px 0;color:$ink2}
.kv b{color:$ink;font-weight:600}

/* ── auth ───────────────────────────────────────────── */
.auth{display:flex;height:100%;width:100%}
.auth-brand{width:52%;flex:0 0 52%;background:$accent;color:$on_accent;padding:56px 64px;
  display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
.auth-logo{display:flex;align-items:center;gap:12px}
.auth-logo .tile{width:44px;height:44px;border-radius:$r_md;background:$on_accent;color:$accent;
  display:flex;align-items:center;justify-content:center;font-weight:800;font-size:22px}
.wordmark{font-size:24px;font-weight:800;letter-spacing:-.02em}
.auth-head{font-size:42px;font-weight:var(--fw-display);line-height:1.14;letter-spacing:-.03em;max-width:520px}
.auth-sub{font-size:14px;line-height:1.6;max-width:420px;margin-top:14px;opacity:.82}
.auth-rings{position:absolute;right:-140px;bottom:-140px;width:460px;height:460px;border-radius:999px;
  border:1px solid rgba(11,18,32,.18)}
.auth-rings:after{content:'';position:absolute;inset:70px;border-radius:999px;border:1px solid rgba(11,18,32,.14)}
.auth-marks{display:flex;gap:24px;font-size:11.5px;font-weight:600;letter-spacing:.02em;opacity:.8}
.auth-form{flex:1;display:flex;align-items:center;justify-content:center;background:$surface;padding:40px}
.form-card{width:400px;display:flex;flex-direction:column;gap:14px}
.form-title{font-size:26px;font-weight:800;letter-spacing:-.02em;line-height:1.2}
.form-sub{font-size:12.5px;color:$ink3;margin-top:-8px}
.field{display:flex;flex-direction:column;gap:5px}
.label{font-size:11.5px;font-weight:600;color:$ink2}
.input{height:44px;border-radius:$r_sm;border:1px solid $line_soft;background:$surface2;display:flex;
  align-items:center;padding:0 12px;font-size:13px;color:$ink;gap:8px}
.input.focus{border-color:$accent;box-shadow:0 0 0 3px rgba(76,158,235,.18);background:$surface}
.input.ph{color:$ink3}
.hint{font-size:11px;color:#C0342B;display:flex;align-items:center;gap:5px}
.row-between{display:flex;align-items:center;justify-content:space-between;font-size:12px}
.check{display:flex;align-items:center;gap:7px;color:$ink2}
.box{width:16px;height:16px;border-radius:4px;border:1.5px solid $line_soft;background:$surface;flex:0 0 auto}
.box.on{background:$accent;border-color:$accent;color:$on_accent;display:flex;align-items:center;
  justify-content:center}
.link{color:$accent_ink;font-weight:600;font-size:12px}
.auth-tabs{display:flex;gap:3px;padding:3px;border-radius:$r_sm;background:$surface2;margin-bottom:2px}
.auth-tabs>span{flex:1;text-align:center;font-size:12.5px;font-weight:600;padding:8px 0;border-radius:8px;
  color:$ink3}
.auth-tabs>span.on{background:$surface;color:$ink;box-shadow:0 1px 2px rgba(15,23,42,.08)}
.divider{display:flex;align-items:center;gap:10px;font-size:11px;color:$ink3}
.divider:before,.divider:after{content:'';height:1px;background:$line_soft;flex:1}
.form-foot{text-align:center;font-size:12px;color:$ink3}

/* ── mobile ─────────────────────────────────────────── */
.board{background:#E7ECF3;display:flex;gap:20px;padding:20px}
.phone{width:390px;height:844px;background:$bg;border-radius:34px;overflow:hidden;display:flex;
  flex-direction:column;position:relative;border:1px solid #D3DBE6}
.statusbar{height:44px;flex:0 0 44px;display:flex;align-items:center;justify-content:space-between;
  padding:0 22px;font-size:11px;font-weight:600;color:$ink;background:$surface}
.statusbar .sig{display:flex;gap:3px;align-items:center}
.statusbar .sig i{display:block;width:3px;background:$ink;border-radius:1px}
.mhead{height:52px;flex:0 0 52px;display:flex;align-items:center;gap:10px;padding:0 14px;
  border-bottom:1px solid $line_soft;background:$surface}
.mtitle{font-size:15px;font-weight:700}
.mbody{flex:1;min-height:0;overflow:hidden;background:$bg}
.mcomposer{flex:0 0 auto;background:$surface;border-top:1px solid $line_soft;padding:8px 12px 10px}
.tabbar{height:60px;flex:0 0 60px;display:flex;align-items:stretch;background:$surface;
  border-top:1px solid $line_soft;padding-bottom:8px}
.tabbar>div{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;
  font-size:9.5px;font-weight:600;color:$ink3;position:relative}
.tabbar>div.on{color:$accent_ink}
.tabbar .tb-badge{position:absolute;top:4px;right:22px;min-width:15px;height:15px;border-radius:999px;
  background:$accent;color:$on_accent;font-size:9px;font-weight:700;display:flex;align-items:center;
  justify-content:center;padding:0 4px}

/* ── misc ───────────────────────────────────────────── */
.muted{color:$ink3}
.soft{color:$ink2}
.mono{font-variant-numeric:tabular-nums}
.pill{font-size:10px;font-weight:600;padding:2px 7px;border-radius:999px;background:$surface2;color:$ink3;
  border:1px solid $line_soft;white-space:nowrap}
.pill.accent{background:$accent_soft;color:$accent_ink;border-color:transparent}
.c-empty{padding:36px 20px;text-align:center;color:$ink3;font-size:12.5px}
"""
)

# Cấu hình hướng C (đã chốt). Tên biến khớp placeholder trong BASE_CSS.
DIRECTIONS = {
    "c": {
        "label": "C — Bề mặt lồng nhau",
        "note": "Canvas xám, panel nổi bo 16px, viền mảnh, rail dạng nút trắng, bóng chỉ ở lớp nổi.",
        "tokens": dict(
            bg="#EDF1F6",
            surface="#FFFFFF",
            surface2="#F6F8FB",
            surface3="#E9EEF5",
            line="#E7EDF5",
            line_soft="#EDF1F7",
            ink="#0F172A",
            ink2="#475569",
            ink3="#6B7A8F",
            accent="#4C9EEB",
            accent_soft="#E8F3FD",
            accent_ink="#1D5E93",
            accent_edge="#2E7CC4",
            on_accent="#0B1220",
            r_sm="10px",
            r_md="12px",
            r_lg="16px",
            body_size="15px",
            rail_bg="transparent",
            rail_ink="#64748B",
            rail_active_bg="#FFFFFF",
            rail_active_ink="#1D5E93",
            sel_bg="#E8F3FD",
            seg_on_bg="#FFFFFF",
            seg_on_ink="#0F172A",
            seg_on_shadow="0 1px 2px rgba(15,23,42,.06)",
            card_border="1px solid #E7EDF5",
            card_radius="16px",
            card_shadow="0 1px 2px rgba(15,23,42,.04)",
            card_pad="16px",
            cover_bg="#DCE7F3",
            media_bg="#E4ECF5",
            media_ink="#8499B0",
            bubble_in="#F6F8FB",
            bubble_in_ink="#0F172A",
            thread_bg="#F6F8FB",
        ),
        "extra": r"""
.app{padding:12px;gap:12px;background:#EDF1F6}
.rail{border:0;padding:6px 0;gap:8px;width:64px;flex-basis:64px}
.rail-btn{background:#fff;border:1px solid #E7EDF5;border-radius:14px;width:42px;height:42px}
.rail-btn.on{color:#1D5E93;border-color:#BBD8F5;box-shadow:0 0 0 3px rgba(76,158,235,.16),0 1px 2px rgba(15,23,42,.05)}
.rail-logo{margin-bottom:10px}
.rail-badge{border-color:#FFFFFF;right:4px;top:3px}
.rail-av{border:2px solid #fff;box-shadow:0 1px 2px rgba(15,23,42,.12)}
.panel,.main,.aux{border:1px solid #E7EDF5;border-radius:16px;overflow:hidden;box-shadow:0 1px 2px rgba(15,23,42,.04)}
.panel{border-right:1px solid #E7EDF5;margin-right:-12px;border-top-right-radius:0;border-bottom-right-radius:0;
  padding-right:12px}
.main{border-top-left-radius:0;border-bottom-left-radius:0;border-left:0}
.aux{border-left:1px solid #E7EDF5;margin-left:0}
.panel-title{font-size:20px}
.conv.on{background:#E8F3FD}
.conv.on .conv-name{color:#12405F}
.card{border-radius:16px}
.post-text{padding:0 18px 10px}
.feed-wrap{padding:14px 16px;gap:16px}
.page-title{font-size:23px}
.quick>div{border:0;background:#F6F8FB}
.msgs{padding:16px 18px 8px}
.bubble{border:0;background:#F6F8FB}
.msg.me .bubble{background:#4C9EEB;color:#0B1220}
.composer{border-top:1px solid #EDF1F7;background:#fff;padding:10px 12px 12px}
.composer-input{background:#F6F8FB;border:1px solid #EDF1F7}
.thread-head{border-bottom:1px solid #EDF1F7;height:60px;flex-basis:60px}
.aux-head{border-bottom:1px solid #EDF1F7}
.tabs{border-bottom:1px solid #EDF1F7}
.group-card{border-bottom:1px solid #EDF1F7}
.action-row{border-top:1px solid #EDF1F7}
.profile-head{background:#fff;margin:12px 12px 0;border:1px solid #E7EDF5;border-radius:16px 16px 0 0;
  padding:0 28px;border-bottom:0}
.profile-body{background:#fff;margin:0 12px 12px;border:1px solid #E7EDF5;border-top:0;
  border-radius:0 0 16px 16px;padding:20px 28px}
.cover{margin:12px 12px 0;border-radius:16px 16px 0 0;border:1px solid #E7EDF5;border-bottom:0}
.auth-brand{background:#4C9EEB}
.auth-form{background:#fff}
.statusbar{background:#fff}
.tabbar{background:#fff;border-radius:0}
""",
    },
}


def css_for(direction_key: str) -> str:
    d = DIRECTIONS[direction_key]
    return BASE_CSS.substitute(**d["tokens"])
