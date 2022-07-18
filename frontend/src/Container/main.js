import React, {useState, useEffect} from 'react';
import $ from "jquery";
import "../Components/Form/Form.scss";
import "./Visual/Visual.scss";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Zoom from 'react-reveal/Zoom';

const Main = () => {

    const [text, setText] = useState("");

    const [url, setUrl] = useState("");
    const [cache, setCache] = useState("");
    const [root, setRoot] = useState("");
    const [net, setNet] = useState("");
    const [dlb, setDlb] = useState("");
    const [ip, setIp] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    }

    let show = false;
    if(ip.length>0){
        show = true;
    }

    const checkURL = () => {
        let check = true;
        if(text.split(".").length < 3 || text.split(".").length > 4){
            check = false;
            return check;
        }
        text.split(".").forEach(element => {
            if(element.length === 0){
                check = false;
                return check;
            }
        });

        return check;
    }
 

  const finalCheck = () => {
    return checkURL();
  }

  const handleSubmit = () => {
    console.log(text);
    const data={
      link:text
    }

    // axios.post("http://localhost:3000/get", {
    //   headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': "*"
    //   },
    //   data
    //   })      
    //   .then((response) => {
    //       console.log(response)
    //   })
    //   .catch((error) => {
    //       console.log(error)
    //   })

      
      fetch('http://localhost:3000/get', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json", 'Access-Control-Allow-Origin': "*"}
      })
      .then(response => response.json()) 
      .then(json => {
          if(json?.message !== undefined){
            toast.info(json.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              return;
          }
          setCache(json[0]['Cache IP Address']);
          setRoot(json[0]['Root IP Address']);
          setNet(json[0]['Net IP Address']);
          setDlb(json[0]['DLB IP Address']);
          setIp(json[0]['IP Address']);
          document.getElementById("visualanchor").scrollIntoView({behavior: "smooth"});
      })
      .catch(err => {
        toast.error('Network Error! Check your browser console.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          console.log(err);
      });


    setText("");
    
  }

  useEffect(() => {
    let jQuery = $;

    (function ($) {
      $(function () {
        $(window).on("scroll", function () {
          fnOnScroll();
        });

        $(window).on("resize", function () {
          fnOnResize();
        });

        var agTimeline = $(".js-timeline"),
          agTimelineLine = $(".js-timeline_line"),
          agTimelineLineProgress = $(".js-timeline_line-progress"),
          agTimelinePoint = $(".js-timeline-card_point-box"),
          agTimelineItem = $(".js-timeline_item"),
          agOuterHeight = $(window).outerHeight(),
          agHeight = $(window).height(),
          f = -1,
          agFlag = false;

        let agPosY;

        function fnOnScroll() {
          agPosY = $(window).scrollTop();

          fnUpdateFrame();
        }

        function fnOnResize() {
          agPosY = $(window).scrollTop();
          agHeight = $(window).height();

          fnUpdateFrame();
        }

        function fnUpdateWindow() {
          agFlag = false;

          agTimelineLine.css({
            top:
              agTimelineItem.first().find(agTimelinePoint).offset().top -
              agTimelineItem.first().offset().top,
            bottom:
              agTimeline.offset().top +
              agTimeline.outerHeight() -
              agTimelineItem.last().find(agTimelinePoint).offset().top,
          });

          if (f !== agPosY) {
            f = agPosY; //try agHeight
            fnUpdateProgress();
          }
        }

        function fnUpdateProgress() {
          var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;

          let i = agTop + agPosY - $(window).scrollTop();
          let a =
            agTimelineLineProgress.offset().top +
            agPosY -
            $(window).scrollTop();
          let n = agPosY - a + agOuterHeight / 2;
          i <= agPosY + agOuterHeight / 2 && (n = i - a);
          agTimelineLineProgress.css({ height: n + "px" });

          agTimelineItem.each(function () {
            var agTop = $(this).find(agTimelinePoint).offset().top;

            agTop + agPosY - $(window).scrollTop() <
            agPosY + 0.5 * agOuterHeight
              ? $(this).addClass("js-ag-active")
              : $(this).removeClass("js-ag-active");
          });
        }

        function fnUpdateFrame() {
          agFlag || requestAnimationFrame(fnUpdateWindow);
          agFlag = true;
        }
      });
    })(jQuery);
  }, []);


return (
        <div>
          
            {/*FORM*/}
            <div className="form-container">
            <Zoom>
        <input
          type="text"
          placeholder="Enter URL"
          onChange={handleChange}
          value={text}
        />
        <div className="rules">
          <ul>
            <li className={checkURL() ? "passed" : "missing"}>
              Enter a valid URL
            </li>
          </ul>
        </div>
        <button disabled={finalCheck() ? false : true} onClick={handleSubmit}> Submit </button>
        </Zoom>

      </div>
     


            {/*VISUAL*/}

            <div className={`visual-main-container ${show ? "" : "displaynone"}`} >
        <div className="ag-timeline-block">
          <div className="ag-timeline_title-box">
            <div className="ag-timeline_tagline" id="visualanchor">DNS VISUALIZER</div>
            <div className="ag-timeline_title">VIZER</div>
          </div>
          <section className="ag-section">
            <div className="ag-format-container">
              
              <div className="js-timeline ag-timeline" >
                <div className="js-timeline_line ag-timeline_line">
                  <div className="js-timeline_line-progress ag-timeline_line-progress"></div>
                </div>
                <div className="ag-timeline_list">
                  <div className="js-timeline_item ag-timeline_item">
                    <div className="ag-timeline-card_box">
                      <div className="js-timeline-card_point-box ag-timeline-card_point-box">
                        <div className="ag-timeline-card_point" >1</div>
                      </div>
                      <div className="ag-timeline-card_meta-box">
                        <div className="ag-timeline-card_meta" >CACHE SERVER</div>
                      </div>
                    </div>
                    <div className="ag-timeline-card_item">
                      <div className="ag-timeline-card_inner">
                        <div className="ag-timeline-card_img-box">
                          <img
                            src="/1.jpg"
                            className="ag-timeline-card_img"
                            width="640"
                            height="360"
                            alt="CACHE SERVER"
                          />
                        </div>
                        <div className="ag-timeline-card_info">
                          <div className="ag-timeline-card_title"  >CACHE SERVER</div>
                          <div className="ag-timeline-card_desc">
                            {cache}
                          </div>
                        </div>
                      </div>
                      <div className="ag-timeline-card_arrow"></div>
                    </div>
                  </div>
  
                  <div className="js-timeline_item ag-timeline_item">
                    <div className="ag-timeline-card_box">
                      <div className="ag-timeline-card_meta-box">
                        <div className="ag-timeline-card_meta">ROOT SERVER</div>
                      </div>
                      <div className="js-timeline-card_point-box ag-timeline-card_point-box">
                        <div className="ag-timeline-card_point">2</div>
                      </div>
                    </div>
                    <div className="ag-timeline-card_item">
                      <div className="ag-timeline-card_inner">
                        <div className="ag-timeline-card_img-box">
                          <img
                            src="/2.jpg"
                            className="ag-timeline-card_img"
                            width="640"
                            height="360"
                            alt=""
                          />
                        </div>
                        <div className="ag-timeline-card_info">
                          <div className="ag-timeline-card_title">ROOT SERVER</div>
                          <div className="ag-timeline-card_desc">
                            {root}
                          </div>
                        </div>
                      </div>
                      <div className="ag-timeline-card_arrow"></div>
                    </div>
                  </div>
  
                  <div className="js-timeline_item ag-timeline_item">
                    <div className="ag-timeline-card_box">
                      <div className="js-timeline-card_point-box ag-timeline-card_point-box">
                        <div className="ag-timeline-card_point">3</div>
                      </div>
                      <div className="ag-timeline-card_meta-box">
                        <div className="ag-timeline-card_meta">NET SERVER</div>
                      </div>
                    </div>
                    <div className="ag-timeline-card_item">
                      <div className="ag-timeline-card_inner">
                        <div className="ag-timeline-card_img-box">
                          <img
                            src="/3.jpg"
                            className="ag-timeline-card_img"
                            width="640"
                            height="360"
                            alt=""
                          />
                        </div>
                        <div className="ag-timeline-card_info">
                          <div className="ag-timeline-card_title">NET SERVER</div>
                          <div className="ag-timeline-card_desc">
                            {net}
                          </div>
                        </div>
                      </div>
                      <div className="ag-timeline-card_arrow"></div>
                    </div>
                  </div>
  
                  <div className="js-timeline_item ag-timeline_item">
                    <div className="ag-timeline-card_box">
                      <div className="ag-timeline-card_meta-box">
                        <div className="ag-timeline-card_meta">DLB SERVER</div>
                      </div>
                      <div className="js-timeline-card_point-box ag-timeline-card_point-box">
                        <div className="ag-timeline-card_point">4</div>
                      </div>
                    </div>
                    <div className="ag-timeline-card_item">
                      <div className="ag-timeline-card_inner">
                        <div className="ag-timeline-card_img-box">
                          <img
                            src="/4.jpg"
                            className="ag-timeline-card_img"
                            width="640"
                            height="360"
                            alt=""
                          />
                        </div>
                        <div className="ag-timeline-card_info">
                          <div className="ag-timeline-card_title">DLB SERVER</div>
                          <div className="ag-timeline-card_desc">
                            {dlb}
                          </div>
                        </div>
                      </div>
                      <div className="ag-timeline-card_arrow"></div>
                    </div>
                  </div>
  
                  <div className="js-timeline_item ag-timeline_item">
                    <div className="ag-timeline-card_box">
                      <div className="js-timeline-card_point-box ag-timeline-card_point-box">
                        <div className="ag-timeline-card_point">5</div>
                      </div>
                      <div className="ag-timeline-card_meta-box">
                        <div className="ag-timeline-card_meta">IP ADDRESS</div>
                      </div>
                    </div>
                    <div className="ag-timeline-card_item">
                      <div className="ag-timeline-card_inner">
                        <div className="ag-timeline-card_img-box">
                          <img
                            src="/5.jpg"
                            className="ag-timeline-card_img"
                            width="640"
                            height="360"
                            alt=""
                          />
                        </div>
                        <div className="ag-timeline-card_info">
                          <div className="ag-timeline-card_title">IP ADDRESS</div>
                          <div className="ag-timeline-card_desc">
                            {ip}
                          </div>
                        </div>
                      </div>
                      <div className="ag-timeline-card_arrow"></div>
                    </div>
                  </div>
  
                  <div className="js-timeline_item ag-timeline_item lastitem">
                    <div className="ag-timeline-card_box">
                      <div className="js-timeline-card_point-box ag-timeline-card_point-box">
                        <div className="ag-timeline-card_point"></div>
                      </div>
                      <div className="ag-timeline-card_meta-box  ">
                        <div className="ag-timeline-card_meta"></div>
                      </div>
                    </div>
                    <div className="ag-timeline-card_item lastitem">
                      <div className="ag-timeline-card_inner">
                        <div className="ag-timeline-card_img-box">
                          
                        </div>
                        <div className="ag-timeline-card_info lastitem">
                          <div className="ag-timeline-card_title"></div>
                          <div className="ag-timeline-card_desc">
                            
                          </div>
                        </div>
                      </div>
                      <div className="ag-timeline-card_arrow lastitem"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
     



        </div>
    );
}

export default Main;




  

  