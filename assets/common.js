/* あんしん決済 Smart版 共通スクリプト（元 v61 single-file の全 script を統合） */
function toggleAll(master) {
  document.querySelectorAll('.card-check').forEach(cb => cb.checked = master.checked);
  updateCount();
}
function updateCount() {
  var n = document.querySelectorAll('.card-check:checked').length;
  var el = document.getElementById('selected-count');
  if (el) {
    el.textContent = n + '件選択中';
    el.style.background = n > 0 ? '#1a1a1a' : '#e0e0e0';
    el.style.color = n > 0 ? 'white' : '#1a1a1a';
  }
}

// ナビ折りたたみ
function toggleNav() {
  var area = document.getElementById('nav-tabs-area');
  var btn = document.getElementById('nav-toggle-btn');
  if (!area) return;
  var isOpen = area.style.display !== 'none';
  area.style.display = isOpen ? 'none' : '';
  btn.textContent = isOpen ? '▼ 開く' : '▲ 閉じる';
}

function showScreen(id, el) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  document.querySelectorAll('.nav-tab').forEach(function(t) { t.classList.remove('active'); });
  var target = document.getElementById('screen-' + id);
  if (target) target.classList.add('active');
  if (el) el.classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

// s02（STEP①）：対象/対象外タブ
function switchTab(mode) {
  const paneTarget = document.getElementById('pane-target');
  const paneNon = document.getElementById('pane-nontarget');
  const tabTarget = document.getElementById('btn-apply-target');
  const tabNon = document.getElementById('btn-apply-nontarget');
  if (!paneTarget || !paneNon) return;
  if (mode === 'target') {
    paneTarget.style.display = 'block';
    paneNon.style.display = 'none';
    if (tabTarget) { tabTarget.style.background = '#1D6B35'; tabTarget.style.color = 'white'; tabTarget.style.border = '2px solid #1D6B35'; }
    if (tabNon) { tabNon.style.background = 'white'; tabNon.style.color = '#c0392b'; tabNon.style.border = '2px solid #c0392b'; }
  } else {
    paneTarget.style.display = 'none';
    paneNon.style.display = 'block';
    if (tabTarget) { tabTarget.style.background = 'white'; tabTarget.style.color = '#1D6B35'; tabTarget.style.border = '2px solid #1D6B35'; }
    if (tabNon) { tabNon.style.background = '#c0392b'; tabNon.style.color = 'white'; tabNon.style.border = '2px solid #c0392b'; }
  }
}

// s03（STEP②）：CS対象/対象外タブ
function switchCsTab(mode) {
  const paneTarget = document.getElementById('cs-pane-target');
  const paneNon = document.getElementById('cs-pane-nontarget');
  const tabTarget = document.getElementById('cs-tab-target');
  const tabNon = document.getElementById('cs-tab-nontarget');
  if (!paneTarget || !paneNon) return;
  if (mode === 'target') {
    paneTarget.style.display = 'block';
    paneNon.style.display = 'none';
    if (tabTarget) { tabTarget.style.background = '#1a1a1a'; tabTarget.style.color = 'white'; }
    if (tabNon) { tabNon.style.background = '#f5f5f5'; tabNon.style.color = '#999'; }
  } else {
    paneTarget.style.display = 'none';
    paneNon.style.display = 'block';
    if (tabTarget) { tabTarget.style.background = '#f5f5f5'; tabTarget.style.color = '#999'; }
    if (tabNon) { tabNon.style.background = '#c0392b'; tabNon.style.color = 'white'; }
  }
}

function mypageViewToggle(view) {
  var sp = document.getElementById('pane-sp-mypage');
  var pc = document.getElementById('pane-pc-mypage');
  var btnSp = document.getElementById('btn-sp-mypage');
  var btnPc = document.getElementById('btn-pc-mypage');
  if (!sp || !pc) return;
  if (view === 'sp') {
    sp.style.display = 'flex'; pc.style.display = 'none';
    if (btnSp) { btnSp.style.background = '#1E56A0'; btnSp.style.color = 'white'; btnSp.style.border = '2px solid #1E56A0'; }
    if (btnPc) { btnPc.style.background = 'transparent'; btnPc.style.color = '#aaa'; btnPc.style.border = '1px solid #555'; }
  } else {
    sp.style.display = 'none'; pc.style.display = 'block';
    if (btnPc) { btnPc.style.background = '#1a1a1a'; btnPc.style.color = 'white'; btnPc.style.border = '2px solid #555'; }
    if (btnSp) { btnSp.style.background = 'transparent'; btnSp.style.color = '#aaa'; btnSp.style.border = '1px solid #555'; }
  }
}

function csMypageTab(tab, el) {
  ['result','car','photo','progress'].forEach(function(t) {
    var pane = document.getElementById('cs-pane-' + t);
    if (pane) pane.style.display = (t === tab) ? 'block' : 'none';
  });
  // Reset all tab styles in the parent container
  if (el) {
    var siblings = el.parentNode.querySelectorAll('div');
    siblings.forEach(function(s) {
      s.style.fontWeight = '';
      s.style.color = '#888';
      s.style.borderBottom = '';
      s.style.marginBottom = '';
    });
    el.style.fontWeight = '700';
    el.style.color = '#c0392b';
    el.style.borderBottom = '3px solid #c0392b';
    el.style.marginBottom = '-2px';
  }
}

function csJudgeChange(value) {
  var koza = document.getElementById('cs-koza-area');
  var ngArea = document.getElementById('cs-ng-reason-area');
  if (koza) koza.style.display = (value === 'ok') ? '' : 'none';
  if (ngArea) ngArea.style.display = (value === 'ng') ? '' : 'none';
  // ラジオラベルの枠線色も切替
  document.querySelectorAll('input[name="cs-judge"]').forEach(function(r) {
    var lbl = r.closest('label');
    if (!lbl) return;
    if (r.checked) {
      if (r.value === 'ok') { lbl.style.border = '2px solid #1D6B35'; lbl.style.background = '#f0f8f3'; }
      else if (r.value === 'ng') { lbl.style.border = '2px solid #f39c12'; lbl.style.background = '#fef5e7'; }
      else { lbl.style.border = '2px solid #c0392b'; lbl.style.background = '#fdf2f0'; }
    } else {
      lbl.style.border = '1px solid #e0e0e0';
      lbl.style.background = 'white';
    }
  });
}
function csNgReasonChange(value) {
  var textarea = document.getElementById('cs-ng-reason-other-text');
  if (!textarea) return;
  if (value === 'other') {
    textarea.disabled = false;
    textarea.style.background = 'white';
    textarea.style.color = '#333';
    textarea.focus();
  } else {
    textarea.disabled = true;
    textarea.style.background = '#fafafa';
    textarea.style.color = '#999';
    textarea.value = '';
  }
}

function showCsToast() {
  var t = document.getElementById('cs-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'cs-toast';
    t.className = 'toast';
    t.textContent = '✓ 更新しました';
    document.body.appendChild(t);
  }
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 2400);
}

function calcGengaku() {
  var before = 1500000;
  var afterVal = parseInt(document.getElementById('gengaku-after').value, 10);
  var el = document.getElementById('gengaku-diff');
  if (!el) return;
  if (!isNaN(afterVal) && afterVal > 0 && afterVal < before) {
    var diff = before - afterVal;
    el.textContent = '▼ ¥' + diff.toLocaleString();
    el.style.color = '#c0392b';
  } else if (!isNaN(afterVal) && afterVal >= before) {
    el.textContent = '⚠️ 減額後の金額は減額前より小さい金額を入力してください';
    el.style.color = '#856404';
  } else {
    el.textContent = '— 入力後に自動算出 —';
    el.style.color = '#aaa';
  }
}

function plnFilter(mode) {
  var rows = document.querySelectorAll('#pln-tbody .plr-row');
  rows.forEach(function(r) {
    if (mode === 'all') {
      r.style.display = '';
    } else if (mode === 'progress' && r.classList.contains('plr-progress')) {
      r.style.display = '';
    } else if (mode === 'cancel' && r.classList.contains('plr-cancel')) {
      r.style.display = '';
    } else if (mode === 'complete' && r.classList.contains('plr-complete')) {
      r.style.display = '';
    } else {
      r.style.display = 'none';
    }
  });
  // バッジのアクティブ状態切替
  ['all','progress','cancel','complete'].forEach(function(m) {
    var btn = document.getElementById('pln-f-' + m);
    if (!btn) return;
    if (m === mode) {
      btn.style.background = '#1a1a1a';
      btn.style.color = 'white';
      btn.style.borderColor = '#1a1a1a';
    } else {
      btn.style.background = 'white';
      if (m === 'cancel') { btn.style.color = '#e67e22'; btn.style.borderColor = '#e67e22'; }
      else if (m === 'complete') { btn.style.color = '#1D6B35'; btn.style.borderColor = '#1D6B35'; }
      else { btn.style.color = '#1a1a1a'; btn.style.borderColor = '#ccc'; }
    }
  });
}

// 【v60】通知先テーブルに行を追加
function addNotifyRow(btn, kind) {
  var table = btn.previousElementSibling;
  if (!table || table.tagName !== 'TABLE') return;
  var tbody = table.querySelector('tbody');
  if (!tbody) return;
  var tr = document.createElement('tr');
  tr.innerHTML =
    '<td style="padding:7px 8px;border:1px solid #e0e0e0;"><input type="text" placeholder="氏名" style="width:100%;border:1px solid #ddd;border-radius:3px;padding:6px 8px;font-size:12px;font-family:inherit;box-sizing:border-box;"></td>' +
    '<td style="padding:7px 8px;border:1px solid #e0e0e0;"><input type="tel" placeholder="090-XXXX-XXXX" style="width:100%;border:1px solid #ddd;border-radius:3px;padding:6px 8px;font-size:12px;font-family:inherit;box-sizing:border-box;"></td>' +
    '<td style="padding:7px 8px;border:1px solid #e0e0e0;"><input type="email" placeholder="xxx@example.com" style="width:100%;border:1px solid #ddd;border-radius:3px;padding:6px 8px;font-size:12px;font-family:inherit;box-sizing:border-box;"></td>' +
    '<td style="padding:7px 8px;border:1px solid #e0e0e0;text-align:center;"><button onclick="if(confirm(\'削除しますか？\'))this.closest(\'tr\').remove()" style="background:white;color:#c0392b;border:1px solid #c0392b;border-radius:3px;padding:4px 10px;font-size:11px;cursor:pointer;font-family:inherit;">削除</button></td>';
  tbody.appendChild(tr);
}

// 【v60→v61】口座用途設定：1口座のみ／入金用はペイジー対応必須
function setKozaUse(btn, useType) {
  // useType: 'nyukin' or 'henkin'
  var row = btn.closest('.koza-row');
  if (!row) return;
  var paygov = row.getAttribute('data-paygov') === '1';
  var name = row.getAttribute('data-name');
  var detail = row.getAttribute('data-detail');

  if (useType === 'nyukin' && !paygov) {
    alert('この口座はペイジー非対応のため、入金用には設定できません。');
    return;
  }

  // 全行から該当バッジを外す
  document.querySelectorAll('#koza-list .koza-row').forEach(function(r) {
    var badge = r.querySelector(useType === 'nyukin' ? '.badge-nyukin' : '.badge-henkin');
    if (badge) badge.style.display = 'none';
    var setBtn = r.querySelector(useType === 'nyukin' ? '.btn-set-nyukin' : '.btn-set-henkin');
    var isPaygov = r.getAttribute('data-paygov') === '1';
    if (!setBtn) return;
    if (useType === 'nyukin') {
      if (isPaygov) {
        setBtn.textContent = '入金用に設定';
        setBtn.style.background = 'white';
        setBtn.style.color = '#c0392b';
        setBtn.style.border = '1px solid #c0392b';
        setBtn.style.cursor = 'pointer';
        setBtn.style.opacity = '1';
        setBtn.disabled = false;
      } else {
        setBtn.textContent = '入金用に設定（不可）';
        setBtn.style.background = '#f5f5f5';
        setBtn.style.color = '#aaa';
        setBtn.style.border = '1px solid #ddd';
        setBtn.style.cursor = 'not-allowed';
        setBtn.disabled = true;
      }
    } else {
      setBtn.textContent = '返金用に設定';
      setBtn.style.background = 'white';
      setBtn.style.color = '#1D6B35';
      setBtn.style.border = '1px solid #1D6B35';
      setBtn.style.cursor = 'pointer';
      setBtn.style.opacity = '1';
      setBtn.disabled = false;
    }
  });

  // 選択された行のバッジを表示・ボタンを「設定済」に
  var targetBadge = row.querySelector(useType === 'nyukin' ? '.badge-nyukin' : '.badge-henkin');
  if (targetBadge) targetBadge.style.display = '';
  var targetBtn = row.querySelector(useType === 'nyukin' ? '.btn-set-nyukin' : '.btn-set-henkin');
  if (targetBtn) {
    targetBtn.textContent = useType === 'nyukin' ? '入金用に設定済' : '返金用に設定済';
    targetBtn.style.background = useType === 'nyukin' ? '#c0392b' : '#1D6B35';
    targetBtn.style.color = 'white';
    targetBtn.style.border = '1px solid ' + (useType === 'nyukin' ? '#c0392b' : '#1D6B35');
    targetBtn.style.cursor = 'default';
    targetBtn.style.opacity = '0.5';
    targetBtn.disabled = true;
  }

  // 上部サマリを更新
  if (useType === 'nyukin') {
    document.getElementById('current-nyukin-name').textContent = name;
    document.getElementById('current-nyukin-detail').textContent = detail;
  } else {
    document.getElementById('current-henkin-name').textContent = name;
    document.getElementById('current-henkin-detail').textContent = detail;
  }

  showCsToast();
}

function switchSettingTab(tab) {
  var tabs = ['notify','payment'];
  tabs.forEach(function(t) {
    var tabEl = document.getElementById('tab-' + t);
    var paneEl = document.getElementById('pane-' + t);
    if (t === tab) {
      tabEl.style.color = '#1a1a1a';
      tabEl.style.borderBottom = '3px solid #1a1a1a';
      paneEl.style.display = 'block';
    } else {
      tabEl.style.color = '#888';
      tabEl.style.borderBottom = '3px solid transparent';
      paneEl.style.display = 'none';
    }
  });
}

function selectPaymentMethod(method) {
  var paygov = document.getElementById('card-paygov');
  if (!paygov) return;
  var bank = document.getElementById('card-bank');
  if (!bank) return;
  var label = document.getElementById('current-method-label');
  if (method === 'paygov') {
    paygov.style.border = '2px solid #1E56A0';
    paygov.querySelector('div:nth-child(2)').style.background = '#1E56A0';
    bank.style.border = '2px solid #e0e0e0';
    bank.querySelector('div:nth-child(2)').style.background = '#e0e0e0';
    label.textContent = '🏧 ペイジー決済';
    label.style.color = '#1E56A0';
  } else {
    bank.style.border = '2px solid #2e7d32';
    bank.querySelector('div:nth-child(2)').style.background = '#2e7d32';
    paygov.style.border = '2px solid #e0e0e0';
    paygov.querySelector('div:nth-child(2)').style.background = '#e0e0e0';
    label.textContent = '🏦 銀行振込';
    label.style.color = '#2e7d32';
  }
}

function saveMethodSetting() {
  var label = document.getElementById('current-method-label');
  alert('入金方法を「' + label.textContent + '」に変更しました。次回の請求書発行から適用されます。');
}

function csViewToggle(sid, view) {
  var pc = document.getElementById('pane-pc-' + sid);
  var sp = document.getElementById('pane-sp-' + sid);
  var btnPc = document.getElementById('btn-pc-' + sid);
  var btnSp = document.getElementById('btn-sp-' + sid);
  if (!pc || !sp) return;
  if (view === 'pc') {
    pc.style.display = 'block'; sp.style.display = 'none';
    btnPc.style.background = '#1a1a1a'; btnPc.style.color = 'white'; btnPc.style.border = '2px solid #555';
    btnSp.style.background = 'transparent'; btnSp.style.color = '#aaa'; btnSp.style.border = '1px solid #555';
  } else {
    pc.style.display = 'none'; sp.style.display = 'flex';
    btnSp.style.background = '#1E56A0'; btnSp.style.color = 'white'; btnSp.style.border = '2px solid #1E56A0';
    btnPc.style.background = 'transparent'; btnPc.style.color = '#aaa'; btnPc.style.border = '1px solid #555';
  }
}

// MOTA/CLログイン切替（PC/SP切替と同じ仕組み）
function loginViewToggle(sid, view) {
  var motaPane = document.getElementById('pane-mota-' + sid);
  var clPane = document.getElementById('pane-cl-' + sid);
  var btnMota = document.getElementById('btn-mota-' + sid);
  var btnCl = document.getElementById('btn-cl-' + sid);
  if (!motaPane || !clPane) return;
  if (view === 'mota') {
    motaPane.style.display = 'block'; clPane.style.display = 'none';
    btnMota.style.background = '#c0392b'; btnMota.style.color = 'white'; btnMota.style.border = '2px solid #c0392b';
    btnCl.style.background = 'transparent'; btnCl.style.color = '#aaa'; btnCl.style.border = '1px solid #555';
  } else {
    motaPane.style.display = 'none'; clPane.style.display = 'block';
    btnCl.style.background = '#f39c12'; btnCl.style.color = 'white'; btnCl.style.border = '2px solid #f39c12';
    btnMota.style.background = 'transparent'; btnMota.style.color = '#aaa'; btnMota.style.border = '1px solid #555';
  }
}

// 入金／送金画面のタブ切替（入金履歴／送金履歴／送金対応／データ発行）
function paymentMgmtTab(tab) {
  var tabs = ['nyukin', 'sokin', 'data'];
  tabs.forEach(function(t) {
    var pane = document.getElementById('pm-pane-' + t);
    var btn = document.getElementById('pm-tab-' + t);
    if (pane) pane.style.display = (t === tab) ? 'block' : 'none';
    if (btn) {
      if (t === tab) {
        if (t === 'data') {
          // データ発行タブはアクティブ時も青系（別ページ感を維持）
          btn.style.background = '#1E56A0';
          btn.style.color = 'white';
          btn.style.border = '1.5px solid #1E56A0';
        } else {
          btn.style.background = '#1a1a1a';
          btn.style.color = 'white';
          btn.style.border = '1px solid #1a1a1a';
        }
      } else {
        if (t === 'data') {
          btn.style.background = 'white';
          btn.style.color = '#1E56A0';
          btn.style.border = '1.5px solid #1E56A0';
        } else {
          btn.style.background = 'white';
          btn.style.color = '#1a1a1a';
          btn.style.border = '1px solid #ccc';
        }
      }
    }
  });
}

// ============================================================
// 判定状態管理：OK/差し戻し/対象外の3択ラジオに応じて
// 送信ボタン・フォーム活性状態・補助エリアを切替
// ============================================================
function updateJudgeStatePC(value) {
  updateJudgeState(value, 'pc');
}
function updateJudgeStateSP(value) {
  updateJudgeState(value, 'sp');
}
function updateJudgeState(value, suffix) {
  var okArea = document.getElementById('ok-form-area-' + suffix);
  var ngArea = document.getElementById('ng-reason-area-' + suffix);
  var ntArea = document.getElementById('nontarget-area-' + suffix);
  var btn = document.getElementById('cs-submit-btn-' + suffix);
  var hint = document.getElementById('cs-submit-hint-' + suffix);

  // OK選択時のみフォーム表示・活性化
  // 差し戻し/対象外選択時はフォーム自体を非表示（スクロール削減のため）
  if (value === 'ok') {
    okArea.style.display = '';
    okArea.style.opacity = '1';
    okArea.style.pointerEvents = 'auto';
    okArea.querySelectorAll('input, select, textarea').forEach(function(el){ el.disabled = false; });
    var hintBox = okArea.querySelector('div'); // 最初のヒントbox
    if (hintBox) hintBox.style.display = 'none';
  } else {
    // 差し戻し/対象外：フォームエリアを完全非表示にしてスクロール量を減らす
    okArea.style.display = 'none';
  }

  // 差し戻し理由エリアの表示制御
  ngArea.style.display = (value === 'ng') ? 'block' : 'none';
  // 対象外エリアの表示制御
  ntArea.style.display = (value === 'nontarget') ? 'block' : 'none';

  // 送信ボタンの動的切替
  btn.disabled = false;
  btn.style.cursor = 'pointer';
  if (value === 'ok') {
    btn.style.background = '#1D6B35';
    btn.style.color = 'white';
    btn.textContent = '✅ 申込を送信する';
    if (hint) hint.textContent = '送信前に確認画面が表示されます';
  } else if (value === 'ng') {
    btn.style.background = '#e67e22';
    btn.style.color = 'white';
    btn.textContent = '⚠️ 差し戻しを送信する';
    if (hint) hint.textContent = '送信前に確認画面が表示されます';
  } else if (value === 'nontarget') {
    btn.style.background = '#c0392b';
    btn.style.color = 'white';
    btn.textContent = '📝 対象外として登録する';
    if (hint) hint.textContent = '送信前に確認画面が表示されます';
  }
}

// ============================================================
// 確認モーダル（送信前の最終確認）
// ============================================================
function openConfirmModalPC() { openConfirmModal('pc'); }
function openConfirmModalSP() { openConfirmModal('sp'); }
function openConfirmModal(suffix) {
  var radio = document.querySelector('input[name="judge-' + suffix + '"]:checked');
  if (!radio) return;
  var value = radio.value;

  var modal = document.getElementById('confirm-modal');
  var title = document.getElementById('confirm-modal-title');
  if (!title) return;
  var body = document.getElementById('confirm-modal-body');
  var okBtn = document.getElementById('confirm-modal-ok-btn');

  if (value === 'ok') {
    title.textContent = '✅ 申込内容の最終確認';
    title.style.color = '#1D6B35';
    body.innerHTML = '以下の内容で<strong>あんしん決済の申込</strong>を送信します。<br><br>' +
      '<div style="background:#f5f5f5;border-radius:4px;padding:12px 16px;font-size:13px;line-height:2;">' +
      '・買取金額 <strong>¥1,500,000</strong> を確認しました<br>' +
      '・MOTA決済ご利用規約に同意済み<br>' +
      '・口座情報を登録済み（◯◯銀行 ××支店）<br>' +
      '</div>' +
      '<div style="font-size:12px;color:#888;margin-top:12px;line-height:1.7;">送信後は買取店に通知され、取引が継続します。送信内容は後から修正できません。</div>';
    okBtn.textContent = '✅ 申込を送信する';
    okBtn.style.background = '#1D6B35';
  } else if (value === 'ng') {
    title.textContent = '⚠️ 差し戻しの最終確認';
    title.style.color = '#e67e22';
    body.innerHTML = '<strong>差し戻し</strong>を送信します。<br><br>' +
      '<div style="background:#fef3e8;border-radius:4px;padding:12px 16px;font-size:13px;line-height:2;color:#9a4a00;">' +
      '買取店に修正依頼が送られます。<br>' +
      '買取店が再登録後、このページで改めて確認できます。' +
      '</div>' +
      '<div style="font-size:12px;color:#888;margin-top:12px;line-height:1.7;">※ 規約同意・お申込み情報・口座情報は送信されません。</div>';
    okBtn.textContent = '⚠️ 差し戻しを送信する';
    okBtn.style.background = '#e67e22';
  } else if (value === 'nontarget') {
    title.textContent = '📝 対象外登録の最終確認';
    title.style.color = '#c0392b';
    body.innerHTML = '<strong>対象外として登録</strong>します。<br><br>' +
      '<div style="background:#fef3e8;border-radius:4px;padding:12px 16px;font-size:13px;line-height:2;color:#9a4a00;">' +
      'あんしん決済なしで取引が進行します。<br>' +
      '買取店にも通知され、通常の取引フローに切り替わります。' +
      '</div>' +
      '<div style="font-size:12px;color:#888;margin-top:12px;line-height:1.7;">※ この操作は取り消しできません。</div>';
    okBtn.textContent = '📝 対象外として登録する';
    okBtn.style.background = '#c0392b';
  }
  modal.style.display = 'flex';
}
function closeConfirmModal() {
  var m = document.getElementById('confirm-modal'); if (m) m.style.display = 'none';
}
function executeSubmit() {
  closeConfirmModal();
  // 完了画面に遷移
  showScreen('s03c', null);
}

// ① STEP③ 入金画面：トグル廃止（v30で削除）
// ② CSローン不足分支払い画面：トグル廃止（v30で削除）

// STEP② 売主成約情報確認 — 金融機関名リアルタイム判定（画面イメージ用デモ）
var PAYGOV_BANKS = ['三菱','みずほ','三井','りそな','埼玉','スルガ','北海道','青森','岩手','秋田','山形','荘内','七十七','東邦','群馬','武蔵野','千葉','横浜','第四','八十二','静岡','浜松','愛知','中京','京都','近畿大阪','南都','池田泉州','兵庫','但馬','山陰','中国','広島','山口','阿波','百十四','伊予','四国','福岡','西日本','北九州','佐賀','十八','長崎','熊本','大分','宮崎','鹿児島','沖縄','琉球','ローソン','セブン','イオン','住信SBI','PayPay','楽天','GMOあおぞら','ソニー'];
var BANK_ONLY = ['ゆうちょ','信用組合','農協','JA','労働金庫','ろうきん'];
function checkBankMethod(name) {
  if (!name || name.length < 2) return null;
  if (BANK_ONLY.some(function(b){ return name.indexOf(b) !== -1; })) return 'bank';
  if (PAYGOV_BANKS.some(function(b){ return name.indexOf(b) !== -1; })) return 'paygov';
  if (name.length >= 3) return 'paygov';
  return null;
}
function renderPayMethod(result, elId, hintId) {
  var el = document.getElementById(elId);
  if (!el) return;
  var hint = hintId ? document.getElementById(hintId) : null;
  if (!result) {
    el.style.display = 'none';
    if (hint) hint.style.display = 'block';
    return;
  }
  el.style.display = 'block';
  if (hint) hint.style.display = 'none';
  if (result === 'paygov') {
    el.style.cssText = 'display:block;background:#e8f5e9;border:1.5px solid #a5d6a7;color:#1D6B35;border-radius:4px;padding:8px 12px;font-size:12px;font-weight:700;margin-top:8px;';
    el.innerHTML = '✅ ペイジー決済が利用できます'
      + '<div style="font-size:10px;font-weight:400;margin-top:4px;color:#2e7d32;">ネットバンキング（インターネットバンキング）契約が必要です。ご利用いただけない場合は別の口座をご入力ください。</div>';
  } else {
    el.style.cssText = 'display:block;background:#f0f4ff;border:1.5px solid #b3c6f5;color:#1E56A0;border-radius:4px;padding:8px 12px;font-size:12px;font-weight:700;margin-top:8px;';
    el.innerHTML = '🏦 銀行振込になります<div style="font-size:10px;font-weight:400;margin-top:2px;color:#444;">指定口座への振込でお支払いいただきます。</div>';
  }
}

// 追い金あり/なしのデモトグル（PC版）
function setOikinPC(hasOikin) {
  var row = document.getElementById('pc-pay-method-row');
  var resultEl = document.getElementById('pc-pay-method-result');
  if (row) row.style.display = hasOikin ? '' : 'none';
  if (!hasOikin && resultEl) { resultEl.style.display = 'none'; }
}
// 追い金あり/なしのデモトグル（SP版）
function setOikinSP(hasOikin) {
  var area = document.getElementById('sp-pay-method-area');
  if (area) area.style.display = hasOikin ? 'block' : 'none';
}
// s03デモ用：PC/SP両方まとめて切替
function s03OikinDemo(hasOikin) {
  setOikinPC(hasOikin);
  setOikinSP(hasOikin);
  var btnOn = document.getElementById('btn-oikin-on');
  var btnOff = document.getElementById('btn-oikin-off');
  if (btnOn) { btnOn.style.background = hasOikin ? '#f39c12' : 'transparent'; btnOn.style.color = hasOikin ? 'white' : '#aaa'; btnOn.style.border = hasOikin ? 'none' : '1px solid #555'; }
  if (btnOff) { btnOff.style.background = !hasOikin ? '#f39c12' : 'transparent'; btnOff.style.color = !hasOikin ? 'white' : '#aaa'; btnOff.style.border = !hasOikin ? 'none' : '1px solid #555'; }
}

function pcBankCheck(val) {
  var result = checkBankMethod(val);
  renderPayMethod(result, 'pc-pay-method-result', null);
  // PC版：お支払い方法欄の静的テキストを結果で置換
  var statusEl = document.getElementById('pc-pay-method-status');
  if (statusEl) statusEl.style.display = 'none';
}
function spBankCheck(val) { renderPayMethod(checkBankMethod(val), 'sp-pay-method-result', 'sp-pay-method-hint'); }

// ③ 送金対応タブ：返金フィルタ
function sokinFilter(type) {
  var btns = {all:'filter-all', sokin:'filter-sokin', henkin:'filter-henkin'};
  Object.keys(btns).forEach(function(k) {
    var btn = document.getElementById(btns[k]);
    if (!btn) return;
    btn.style.background = (k === type) ? '#1a1a1a' : 'white';
    btn.style.color = (k === type) ? 'white' : '#1a1a1a';
    btn.style.border = (k === type) ? '1px solid #1a1a1a' : '1px solid #ccc';
  });
  var henkinRecs = document.querySelectorAll('.henkin-record');
  var sokinRecs = document.querySelectorAll('.sokin-record:not(.henkin-record)');
  henkinRecs.forEach(function(el) {
    el.style.display = (type === 'sokin') ? 'none' : 'flex';
  });
  sokinRecs.forEach(function(el) {
    el.style.display = (type === 'henkin') ? 'none' : 'flex';
  });
}

// 通知先ドロップダウン制御
function switchPayMethod(method) {
  var pGov = document.getElementById('panel-paygov');
  var pBank = document.getElementById('panel-bank');
  var rGov = document.getElementById('radio-paygov');
  var rBank = document.getElementById('radio-bank');
  if (!pGov || !pBank) return;
  if (method === 'paygov') {
    pGov.style.border = '2px solid #1E56A0'; pGov.style.opacity = '1'; pGov.style.background = 'white';
    pGov.querySelector('[onclick]').style.background = '#1E56A0';
    pBank.style.border = '2px solid #e0e0e0'; pBank.style.opacity = '0.6'; pBank.style.background = '#f9f9f9';
    pBank.querySelector('[onclick]').style.background = '#e0e0e0';
    if(rGov) rGov.checked = true;
  } else {
    pBank.style.border = '2px solid #1a1a1a'; pBank.style.opacity = '1'; pBank.style.background = 'white';
    pBank.querySelector('[onclick]').style.background = '#1a1a1a';
    pBank.querySelector('[onclick] span').style.color = 'white';
    pGov.style.border = '2px solid #e0e0e0'; pGov.style.opacity = '0.6'; pGov.style.background = '#f9f9f9';
    pGov.querySelector('[onclick]').style.background = '#e0e0e0';
    if(rBank) rBank.checked = true;
  }
}
function toggleNotifyDD(id) {
  var allDDs = ['dd-sms','dd-mail-satei','dd-mail-keiri','dd-satei','dd-sekininsha'];
  allDDs.forEach(function(d){ if(d!==id){ var el=document.getElementById(d); if(el) el.style.display='none'; } });
  var dd = document.getElementById(id);
  if(dd) dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}
function selectNotify(id, val) {
  var dd = document.getElementById(id);
  if(dd) {
    var trigger = dd.previousElementSibling;
    if(trigger) { var sp = trigger.querySelector('span'); if(sp) sp.textContent = val; }
    dd.style.display = 'none';
  }
}
function addSateiTag(name, detail) {
  var container = document.getElementById('satei-selected');
  if (!container) return;
  // 重複チェック
  var existing = container.querySelectorAll('[data-name]');
  for (var i = 0; i < existing.length; i++) {
    if (existing[i].getAttribute('data-name') === name) {
      var dd = document.getElementById('dd-satei');
      if(dd) dd.style.display = 'none';
      return;
    }
  }
  var tag = document.createElement('div');
  tag.setAttribute('data-name', name);
  tag.style.cssText = 'display:flex;align-items:center;gap:4px;background:#1a1a1a;color:white;border-radius:3px;padding:4px 10px;font-size:12px;font-weight:700;';
  tag.innerHTML = name + '<span style="font-size:10px;color:rgba(255,255,255,0.6);margin-left:2px;">' + detail + '</span><span onclick="this.parentElement.remove()" style="cursor:pointer;margin-left:6px;opacity:0.7;font-size:13px;">×</span>';
  container.appendChild(tag);
  var dd = document.getElementById('dd-satei');
  if(dd) dd.style.display = 'none';
}
// 【v54追加】責任者タグ（緑テーマ・複数選択可）
function addSekininshaTag(name, detail) {
  var container = document.getElementById('sekininsha-selected');
  if (!container) return;
  // 重複チェック
  var existing = container.querySelectorAll('[data-name]');
  for (var i = 0; i < existing.length; i++) {
    if (existing[i].getAttribute('data-name') === name) {
      var dd = document.getElementById('dd-sekininsha');
      if(dd) dd.style.display = 'none';
      return;
    }
  }
  var tag = document.createElement('div');
  tag.setAttribute('data-name', name);
  tag.style.cssText = 'display:flex;align-items:center;gap:4px;background:#1D6B35;color:white;border-radius:3px;padding:4px 10px;font-size:12px;font-weight:700;';
  tag.innerHTML = name + '<span style="font-size:10px;color:rgba(255,255,255,0.7);margin-left:2px;">' + detail + '</span><span onclick="this.parentElement.remove()" style="cursor:pointer;margin-left:6px;opacity:0.7;font-size:13px;">×</span>';
  container.appendChild(tag);
  var dd = document.getElementById('dd-sekininsha');
  if(dd) dd.style.display = 'none';
}
document.addEventListener('click', function(e){
  if(!e.target.closest('[onclick^="toggleNotifyDD"]')){
    ['dd-sms','dd-mail-satei','dd-mail-keiri','dd-satei','dd-sekininsha'].forEach(function(id){
      var el=document.getElementById(id); if(el) el.style.display='none';
    });
  }
});

/* ===== 分割版 追加: 画面間遷移を別ファイルへ ===== */
var VALID_SCREENS=["no-action-cs", "no-action-cl", "s01", "s02", "s03", "s03c", "cs-settings", "s03-gengaku", "s03-cancel", "s05", "s05-cs-oikin", "s09", "s09-gengaku", "s09-cancel", "prop-detail-cl", "prop-detail", "prop-list-new", "payment-mgmt", "summary", "login", "cl-koza-link", "cl-basic-info"];
function showScreen(id, el){
  if (!id) return;
  if (VALID_SCREENS.indexOf(id) === -1){ return; }   /* 旧仕様: 該当画面なしは何もしない */
  location.href = id + '.html';
}
