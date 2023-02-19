var lastPrice=0
var chart = new TradingView.widget({
    container_id: "chart-container",
    symbol: "BITSTAMP:BTCUSD",
    interval: "D",
    timezone: "Etc/UTC",
    theme: "Dark",
    style: "1",
    toolbar_bg: "#f1f3f6",
    hide_side_toolbar: false,
    allow_symbol_change: true,
    save_image: false,
    hideideas: true,
    studies: [],
    show_popup_button: true,
    popup_width: "1000",
    popup_height: "650",
    onSymbolChange: function(symbol) {
      chart.getBars(symbol, 1, function(result) {
        lastPrice = result[0].close;
        console.log(lastPrice);
      });
    }
  });
  
  
