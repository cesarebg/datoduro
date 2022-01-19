var detailMapButton = document.getElementById('detailMap');
var trendMapButton = document.getElementById('yearComparisons');

detailMapButton.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('trendMap').setAttribute('style', 'display:none;');
    document.getElementById('searchMap').setAttribute('style', 'display:block;');
  };

  trendMapButton.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      document.getElementById('searchMap').setAttribute('style', 'display:none;');
      document.getElementById('trendMap').setAttribute('style', 'display:flex;');

    };
