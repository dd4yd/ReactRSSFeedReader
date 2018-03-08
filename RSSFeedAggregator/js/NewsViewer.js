/* David Dean
   Powerpost
   July 17, 2017 */

//import Wrapper from 'Wrapper';
//import ModalWrapper from 'ModalWrapper';

import styles from 'style/style.css';

var LiveFeed = React.createClass({
  getInitialState: function() {
    return {
      data : undefined
    };
  },
  componentDidMount: function() {

    var widget = this;

    jQuery.getFeed({
      url: this.props.url,
      success: function(feed) {

        if(widget.isMounted()) {
          widget.setState({
            data: feed
          });
        }

      }
    });
  },
  removeCdata : function(text) {
    return text.replace("<![CDATA[", "").replace("]]>","").trim();
  },
  render : function() {

    if(this.state.data) {

      var widget = this;
      var items = this.state.data.items.map(function(item) {

          var title = widget.removeCdata(item.title);
          var description = widget.removeCdata(item.description);
          description = description.substring(0, widget.props.lengthOfExcerpt);
          var linkage = widget.removeCdata(item.link);

          return (
            <div className="wrapper">
              <div className="header">
                <a href={item.link}><h1>{title}</h1></a>
                <p className="description" dangerouslySetInnerHTML={__html: description}></p>
              </div>
            </div>
          );
      });

      return(
        <div>
          {items}
        </div>
      );
    } else {
      return (<div><p>Loading Posts...</p></div>);
    }
  }
});

//LOOKS LIKE SHIT
/*React.render(
  <LiveFeed url="http://feeds.feedburner.com/TechCrunch/social" lengthOfExcerpt="2000"/>,
  document.getElementById('feed2')
);*/

React.render(
  <LiveFeed url="http://crossorigin.me/http://feeds.feedburner.com/ECMag-WebFeatures" lengthOfExcerpt="500"/>,
  document.getElementById('feed')
);

React.render(
  <LiveFeed url="http://contentmarketinginstitute.com/author/joepulizzi/feed/" lengthOfExcerpt="500"/>,
  document.getElementById('feed2')
);

React.render(
  <LiveFeed url="http://feeds.feedburner.com/ECMag-Features" lengthOfExcerpt="500"/>,
  document.getElementById('feed3')
);

React.render(
  <LiveFeed url="https://www.smashingmagazine.com/feed/" lengthOfExcerpt="500"/>,
  document.getElementById('feed4')
);

React.render(
  <LiveFeed url="http://feeds.feedburner.com/EcontentMagAllArticles" lengthOfExcerpt="500"/>,
  document.getElementById('feed5')
);

//where it starts looking shitty
React.render(
  <LiveFeed url="http://feeds.feedburner.com/seomoz" lengthOfExcerpt="500"/>,
  document.getElementById('feed6')
);

React.render(
  <LiveFeed url="http://feeds.feedburner.com/OnlineMarketingSEOBlog" lengthOfExcerpt="500"/>,
  document.getElementById('feed7')
);
