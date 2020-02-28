export default {
    methods: {
        gridLayoutAddRecord(screenSize){
            var layout = "";
            switch (screenSize) {
              case 'xs': layout = 'xs8 offset-xs2';
                break;
              case 'sm': layout = 'xs8 offset-xs2';
                break;
              case 'md': layout = 'xs6 offset-xs3';
                break;
              case 'lg': layout = 'xs6 offset-xs3';
                break;
              case 'xl': layout = 'xs6 offset-xs3'
            }
            return layout;
        },
        titleStyle(screenSize){
            var style="";
            switch (screenSize) {
              case 'xs': style='title font-weight-bold';
                break;
              case 'sm': style='title font-weight-bold';
                break;
              case 'md': style='display-1 font-weight-bold';
                break;
              case 'lg': style='display-1 font-weight-bold';
                break;
              case 'xl': style='display-1 font-weight-bold';
                break;
            }
            return style;
        },
        gridLayoutTitle(screenSize){
            var layout = "";
            switch (screenSize) {
               case 'xs': 
                  layout = "xs10 title font-weight-bold text-xs-left pl-3";
                break;
              case 'sm': 
                  layout = "xs6 title font-weight-bold text-xs-left pl-3";
                break; 
              case 'md': 
                  layout = "xs6 display-1 font-weight-bold text-xs-left pl-3";
                break; 
              case 'lg': 
                  layout = "xs6 display-1 font-weight-bold text-xs-left pl-3";
                break; 
              case 'xl': 
                  layout = "xs6 display-1 font-weight-bold text-xs-left pl-3";
                break; 
            }
            return layout;
          },
        titleStyleSearchPeople(screenSize){
            var style="";
            switch (screenSize) {
              case 'xs': style='xs8 title text-xs-left';
                break;
              case 'sm': style='xs8 title text-xs-left';
                break;
              case 'md': style='xs6 display-2 text-xs-left';
                break;
              case 'lg': style='xs6 display-2 text-xs-left';
                break;
              case 'xl': style='xs6 display-2 text-xs-left';
                break;
            }
            return style;
        },
        cardTitleStyle(screenSize){
            var style="";
            switch (screenSize) {
              case 'xs': style='title';
                break;
              case 'sm': style='title';
                break;
              case 'md': style='display-1';
                break;
              case 'lg': style='display-1';
                break;
              case 'xl': style='display-1';
                break;
            }
            return style;
        },
        fontSizeParagraph(screenSize){
            var fontSize='';
            switch (screenSize) {
              case 'xs': fontSize = '12px'
                break;
              case 'sm': fontSize =  '12px'
                break;
              case 'md': fontSize =  '14px'
                break;
              case 'lg': fontSize =  '16px'
                break;
              case 'xl': fontSize =  '16px'
                break;
            }
            return fontSize;
        },
        gridLayoutShowRecord(screenSize){
            var layout = "";
            switch (screenSize) {
              case 'xs': layout = 'xs12 pr-3 ml-2';
                break;
              case 'sm': layout = 'xs8 pr-3 ml-2';
                break;
              case 'md': layout = 'xs6 pr-3';
                break;
              case 'lg': layout = 'xs6 pr-3';
                break;
              case 'xl': layout = 'xs6 pr-3'
            }
            return layout;
        },
        gridLayoutSearchResult(screenSize){
            var layout = "";
            switch (screenSize) {
              case 'xs': layout = 'xs12';
                break;
              case 'sm': layout = 'xs9';
                break;
              case 'md': layout = 'xs9';
                break;
              case 'lg': layout = 'xs9';
                break;
              case 'xl': layout = 'xs9'
            }
            return layout;
        },
        gridLayoutShowResult(screenSize){
            var layout = "";
            switch (screenSize) {
              case 'xs': layout = 'xs12';
                break;
              case 'sm': layout = 'xs12';
                break;
              case 'md': layout = 'xs9';
                break;
              case 'lg': layout = 'xs9';
                break;
              case 'xl': layout = 'xs9'
            }
            return layout;
        },
        gridProfileHeaderEditRecord(screenSize){
          var layout = "";
          switch (screenSize) {
            case 'xs': layout = 'xs6 ml-5';
              break;
            case 'sm': layout = 'xs6 ml-5';
              break;
            case 'md': layout = 'xs6';
              break;
            case 'lg': layout = 'xs6';
              break;
            case 'xl': layout = 'xs6'
          }
          return layout;
      },
    smallScreenCompute(screenSize){
        var smallScreen=false;
        if(screenSize == "xs")
        {
          smallScreen = true;
        }
        else{
          smallScreen = false;
        }
        return smallScreen;
    },
    smallScreenSearchCompute(screenSize){
        var smallScreen=false;
        if(screenSize == "xs")
        {
          smallScreen = true;
        }
        else if(screenSize == "sm")
        {
          smallScreen = true;
        }
        else{
          smallScreen = false;
        }
        return smallScreen;
    },

    detailCardTitleStyle(screenSize)
    {
        var style="";
        switch (screenSize) {
            case 'xs': style='title';
            break;
            case 'sm': style='title';
            break;
            case 'md': style='display-1';
            break;
            case 'lg': style='display-1';
            break;
            case 'xl': style='display-1';
            break;
        }
        return style;
    },
    detailCardBtnSize(screenSize){
        var size = "";
        switch (screenSize) {
            case 'xs': size = 'x-small';
            break;
            case 'sm': size = 'small';
            break;
            case 'md': size = '';
            break;
            case 'lg': size = '';
            break;
            case 'xl': size = ''
        }
        //console.log("computed size :"+size);
        return size;
    },
    minProfilePictureWidth(screenSize){
      console.log()
      var size='';
      if(screenSize == "xs")
      {
        size='80';
      }
      else if(screenSize == "sm")
      {
        size='80';
      }
      else{
        size='';
      }
      return size;
  },
  profileHeaderGridLayout(screenSize){
    var layout = "";
    switch (screenSize) {
      case 'xs': layout = 'xs5';
        break;
      case 'sm': layout = 'xs3';
        break;
      case 'md': layout = 'xs1';
        break;
      case 'lg': layout = 'xs1';
        break;
      case 'xl': layout = 'xs1'
    }
    return layout;
  },
  }
}
  