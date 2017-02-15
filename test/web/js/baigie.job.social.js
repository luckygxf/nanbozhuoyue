// ソーシャルボタン関連

/*
/* SNSのカウント数合算
**/
function get_social_count_facebook(url, target_group, target) {
  if (target_group == undefined) {
    target_group = '#js-social-panel';
  }
  if (target == undefined) {
    target = '.js-social-facebook';
  }
  $.ajax({
    url: 'https://graph.facebook.com/',
    dataType: 'json',
    data: {
      id: url,
      access_token: _fb_access_token
    },
    success: function (res) {
      var shares = 0;
      if (res.share && res.share.share_count) {
        shares = parseInt(res.share.share_count, 10);
      }
      if (!shares) {
        shares = 0;
      }
      var oldshares = 0;
      if (url in _facebook_shares) {
        oldshares = _facebook_shares[url];
      }
      shares += oldshares;
      var snsPanel = $(target_group);
      snsPanel.find(target).text(shares);
    },
    error: function () {
      if (url in _facebook_shares) {
        var shares = _facebook_shares[url];
        shares = shares.toString().replace(/(\d)(?=(\d\d\d)+$)/g, '$1,');
        var snsPanel = $(target_group);
        snsPanel.find(target).text(shares);
      }
    }
  });
}

function get_social_count_hatena(url, target_group, target) {
  if (target_group == undefined) {
    target_group = '#js-social-panel';
  }
  if (target == undefined) {
    target = '.js-social-hatana';
  }
  $.ajax({
    url: 'https://b.hatena.ne.jp/entry.count',
    dataType: 'jsonp',
    data: {
      url: url
    },
    success: function (res) {
      var shares = 0;
      if (res) {
        shares = parseInt(res, 10);
      }
      if (!shares) {
        shares = 0;
      }
      var oldshares = 0;
      if (url in _hatena_shares) {
        oldshares = _hatena_shares[url];
      }
      shares += oldshares;
      var snsPanel = $(target_group);
      snsPanel.find(target).text(shares);
    },
    error: function () {
      if (url in _hatena_shares) {
        var shares = _hatena_shares[url];
        shares = shares.toString().replace(/(\d)(?=(\d\d\d)+$)/g, '$1,');
        var snsPanel = $(target_group);
        snsPanel.find(target).text(shares);
      }
    }
  });
}

function get_social_count_google(url, target_group, target) {
  if (target_group == undefined) {
    target_group = '#js-social-panel';
  }
  if (target == undefined) {
    target = '.js-social-google';
  }
  $.ajax({
    url: '/lib/google/sharecount.php',
    dataType: 'text',
    data: {
      url: url
    },
    success: function (res) {
      var shares = 0;
      if (res) {
        shares = parseInt(res, 10);
      }
      if (!shares) {
        shares = 0;
      }
      var oldshares = 0;
      if (url in _google_shares) {
        oldshares = _google_shares[url];
      }
      shares += oldshares;
      var snsPanel = $(target_group);
      snsPanel.find(target).text(shares);
    },
    error: function () {
      if (url in _google_shares) {
        var shares = _google_shares[url];
        shares = shares.toString().replace(/(\d)(?=(\d\d\d)+$)/g, '$1,');
        var snsPanel = $(target_group);
        snsPanel.find(target).text(shares);
      }
    }
  });
}

function get_social_count_twitter(url, target_group, target) {
  if (target_group == undefined) {
    target_group = '#js-social-panel';
  }
  if (target == undefined) {
    target = '.js-social-twitter';
  }
  jQuery.ajax({
    url: 'https://jsoon.digitiminimi.com/twitter/count.json',
    dataType: 'jsonp',
    timeout: 10000, //10sec
    data: {
      url: url
    },
    success: function (res) {
      var snsPanel = $(target_group);
      snsPanel.find(target).text(res.count);
    },
    error: function () {
//      jQuery(selector).html('error');
      var snsPanel = $(target_group);
      snsPanel.find(target).text(0);
    }
  });
}

var _fb_access_token = '224295318007110|1c2affe572fcc73bf29673fca2bc6e16';

var _facebook_shares = {
  'https://baigie.me/job/':324,
  'https://baigie.me/job/merit/':1,
  'https://baigie.me/job/merit/?c=index':1,
  'https://baigie.me/job/merit/?c=9things':2,
  'https://baigie.me/job/merit/?c=occupation':2,
  'https://baigie.me/job/merit/?c=events':2,
  'https://baigie.me/job/vision/':16,
  'https://baigie.me/job/vision/?c=index':16,
  'https://baigie.me/job/vision/?c=policy':16,
  'https://baigie.me/job/vision/?c=future':16,
  'https://baigie.me/job/vision/?c=guideline':16,
  'https://baigie.me/job/message/':6,
  'https://baigie.me/job/message/?c=index':6,
  'https://baigie.me/job/message/?c=workers':6,
  'https://baigie.me/job/message/?c=voice':6,
  'https://baigie.me/job/message/?c=tips':6,
  'https://baigie.me/job/office/':78,
  'https://baigie.me/job/office/?c=index':78,
  'https://baigie.me/job/requrement/':7,
  'https://baigie.me/job/requrement/?c=index':7
};
var _hatena_shares = {
  'https://baigie.me/job/':29,
  'https://baigie.me/job/merit/':0,
  'https://baigie.me/job/merit/?c=index':0,
  'https://baigie.me/job/vision/':2,
  'https://baigie.me/job/vision/?c=index':2,
  'https://baigie.me/job/message/':1,
  'https://baigie.me/job/message/?c=index':1,
  'https://baigie.me/job/office/':0,
  'https://baigie.me/job/office/?c=index':0,
  'https://baigie.me/job/requrement/':0,
  'https://baigie.me/job/requrement/?c=index':0
};
var _google_shares = {
  'https://baigie.me/job/':0,
  'https://baigie.me/job/merit/':0,
  'https://baigie.me/job/merit/?c=index':0,
  'https://baigie.me/job/vision/':0,
  'https://baigie.me/job/vision/?c=index':0,
  'https://baigie.me/job/message/':3,
  'https://baigie.me/job/message/?c=index':3,
  'https://baigie.me/job/office/':0,
  'https://baigie.me/job/office/?c=index':0,
  'https://baigie.me/job/requrement/':0,
  'https://baigie.me/job/requrement/?c=index':0
};
