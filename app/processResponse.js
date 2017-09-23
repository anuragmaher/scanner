'use strict';

function getSliceHtml(slice) {
  let html = '';
  for(let i = 0; i< slice.length; i++) {
    const sliceTemp = slice[i];
    const { duration, segment } = sliceTemp;
    const { flight } = segment[0];
    const { carrier, number } = flight;
    const { departureTime, arrivalTime } = segment[0].leg[0];

    html = html + '<div stlye="paddig: 10px"> Slice: ' + i + " Duration: " + duration + '</div>';
    html = html + '<div> Flight: ' + carrier + ' ' + number + '</div>';
    html = html + '<div> departureTime: ' + departureTime + ' arrivalTime: ' + arrivalTime + '</div>';
  }
  return html;
}

module.exports = {
  parseResponse : function(fromEmail, response) {
    let body = '3 solutions found. <br/><br/><br/>';
    for(var i = 0;i < response.length;i++){
      const displayCount = i+1;
      const solution = response[i];
      const { slice } = solution;
      body = body + 'Solution#   ' + displayCount + '   Sale Price: ' + solution.saleTotal + ' <br/> ';
      const sliceHTML = getSliceHtml(slice);
      body = body + sliceHTML;
      body = body + '<br/>';
    }
    return body;
  }
}
