function createCryptoChart(symbol, interval, containerId, chartBackgroundColor,fontFamily, textColor, lineWidth, lineColor, topColor, bottomColor, vcrosshairColor, vcrosshairBgColor, hcrosshairColor, hcrosshairBgcolor) {

    var lineSeriesData = {};

    document.getElementById(containerId+'-info').innerText = symbol+'/'+interval;

    return fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`)
      .then(response => response.json())
      .then(data => {
        const candles = data.map(candle => {
          return {
            value: parseFloat(candle[4]),
            time: candle[0] / 1000,
          };
        });

        document.getElementById(containerId+'-price').innerText = candles[candles.length-1].value
        
        const chart = LightweightCharts.createChart(
          document.getElementById(containerId), 
          {    
            layout: { 
              background: { color: chartBackgroundColor },
              textColor: textColor,
            },
            grid: { 
              vertLines: { color: '#00000000' },
              horzLines: { color: '#00000000' },
            }, 
            textColor: textColor,
          }
        ); 
            
        const areaSeries = chart.addAreaSeries({
          lineWidth: lineWidth, 
          lineColor: lineColor, 
          topColor: topColor, 
          bottomColor: bottomColor,
          lineType: 2
        });
                          
        // Customizing the Crosshair
        chart.applyOptions({
          crosshair: {
  
            // Vertical crosshair line (showing Date in Label)
            vertLine: {
              width: 1,
              color: vcrosshairColor,
              labelBackgroundColor: vcrosshairBgColor,
            },
  
            // Horizontal crosshair line (showing Price in Label)
            horzLine: {
              width: 1,
              color: hcrosshairColor,
              labelBackgroundColor: hcrosshairBgColor,
            },
          },
          // Changing the font
          layout: {
            fontFamily: fontFamily,
          },
        });
        
        areaSeries.setData(candles);
        chart.timeScale().fitContent();
        
        const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);
        
        binanceSocket.onmessage = function (event) {
          const message = JSON.parse(event.data);
          const candle = message.k;
          const time = candle.t / 1000;
          const close = parseFloat(candle.c);
  
          const lastData = candles[candles.length - 1];
          const lastTime = lastData.time;
  
          if (time > lastTime) {
            candles.push({ value: close, time: time });
            areaSeries.update({ value: close, time: time });
          }
        };
        
        return chart;
      })
      .catch(error => console.error(error));
}
 

createCryptoChart(  symbol = 'BTCUSDT', 
                    interval = '1m', 
                    containerId = 'chart1-lightChart',
                    chartBackgroundColor = '#e0e0e000',
                    fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                    textColor = '#5c5c5c',
                    lineWidth = '1',
                    lineColor = '#009087',
                    topColor = '#1fb2a8c1', 
                    bottomColor = '#18353300',
                    vcrosshairColor = '#aeaec0ff',
                    vcrosshairBgColor = '#5c5c5c',
                    hcrosshairColor = '#aeaec0ff',
                    hcrosshairBgColor = '#5c5c5c'
                    );

                    
createCryptoChart(  symbol = 'BTCUSDT', 
                    interval = '1m', 
                    containerId = 'chart1-darkChart',
                    chartBackgroundColor = '#0b161400',
                    fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                    textColor = '#aeaec0ae',
                    lineWidth = '1',
                    lineColor = '#1fb2a8c1',
                    topColor = '#1fb2a8c1', 
                    bottomColor = '#18353300',
                    vcrosshairColor = '#63b5af50',
                    vcrosshairBgColor = '#273c38',
                    hcrosshairColor = '#63b5af50',
                    hcrosshairBgColor = '#273c38'
                    );
