import React, { useEffect, useState, useReducer } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { useSelector, useDispatch } from "react-redux";
import { Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { Collapse } from "reactstrap";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";

import "../../../shared/Css/App.css";

import backIcon from "../../../shared/assets/icons/back.svg";
import qmarkIcon from "../../../shared/assets/icons/question.svg";
import { isEmpty } from "../../../shared/helpers/validationHelpers";

import * as outfitActions from "../../../redux/actions/outfitActions";

import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import Footer from "../../../shared/components/Footer/Footer";
import Header from "../../../shared/components/Header/Header";
import VariantImage from "./VariantImage";
import ModalComponent from "../../../shared/components/Modal/Modal";
import ErrorModal from "./ModalError";
import OrderModal from './OrderSummary';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5, // optional, default to 1
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
    slidesToSlide: 5, // optional, default to 1.
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 5,
    slidesToSlide: 3, // optional, default to 1.
    partialVisibilityGutter: 30,
  },
};

const initCustomizeState = {
  color: "",
  sleeve: "",
  fabric: "",
  trouser: "",
  breast: "",
  accessory: "",
};

function customizeReducer(state, { type, payload }) {
  switch (type) {
    case "COLOR":
      return { ...state, color: payload };
    case "SLEEVE":
      return { ...state, sleeve: payload };
    case "FABRIC":
      return { ...state, fabric: payload };
    case "TROUSER":
      return { ...state, trouser: payload };
    case "BREAST":
      return { ...state, breast: payload };
    case "ACCESSORIES":
      return { ...state, accessory: payload };
    default:
      throw state;
  }
}

const Customize = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("1");
  const [collapse, setCollapse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [status, setStatus] = useState("closed");
  const [selectedVariant, setSelectedVariant] = useState(undefined);
  const [imageSrc, setImageSrc] = useState("");
  const [customize, customDispatch] = useReducer(
    customizeReducer,
    initCustomizeState
  );

  const selectedProduct = useSelector(
    (state) =>
      state.outfit.products.filter((product) => {
        return product.id === parseInt(params.productId);
      })[0]
  );


  const variants = useSelector((state) => state.outfit.variants);
  const isLoading = useSelector((state) => state.outfit.isLoading);

  useEffect(() => {
    if (isEmpty(selectedProduct)) {
      history.push("/outfit/collections");
    } else {
      if (
        isEmpty(customize.color) &&
        isEmpty(customize.sleeve) &&
        isEmpty(customize.fabric)
      ) {
        setImageSrc(selectedProduct.image.src);

      } else {
        const choice = filterSelectedVariant(variants, customize);

        const img =
          choice.retrievedImage !== null
            ? choice.retrievedImage.src
            : selectedProduct.image.src;
        setImageSrc(img);
        setSelectedVariant(choice);
      }
      dispatch(outfitActions.getProductVariants(params.productId));
    }
  }, [customize]);

  const filterSelectedVariant = (variants, customize) => {
    const sleeves = variants.map((variant) => variant.option1);
    const fabrics = variants.map((variant) => variant.option2);
    const colors = variants.map((variant) => variant.option3);

    const color = customize.color || colors[0];
    const sleeve = customize.sleeve || sleeves[0];
    const fabric = customize.fabric || fabrics[0];
    const selectedVariant = variants.filter(
      (variant) =>
        variant.option1 === sleeve &&
        variant.option2 === fabric &&
        variant.option3 === color
    );
    return selectedVariant[0];
  };


  const extractVariantColors = (variants) => {
    const colorVariants = variants.map((variant) => variant.option3);
    const uniqueColors = [...new Set(colorVariants)].map((color) => ({
      text: color,
      color: color.split(" ").join("").toLowerCase(),
    }));

    return uniqueColors.map((color, idx) => {
      return (
        <div className="slider_content" key={idx}>
          <div
            className={`slider_circle ${
              customize.color === color.text ? "selected" : ""
            }`}
            style={{ backgroundColor: color.color }}
            onClick={() =>
              customDispatch({ type: "COLOR", payload: color.text })
            }
          ></div>
          <small className="atr-text">{color.text}</small>
        </div>
      );
    });
  };

  const extractVariantFabrics = (variants) => {
    const fabrics = variants.map((variant) => variant.option2);
    const uniquefabrics = [...new Set(fabrics)];

    return uniquefabrics.map((fabric, idx) => (
      <div className="slider_content" key={idx}>
        <div
          className={`slider_circle ${
            customize.fabric === fabric ? "selected" : ""
          }`}
          style={{ backgroundColor: "#CACACA" }}
          onClick={(params) =>
            customDispatch({ type: "FABRIC", payload: fabric })
          }
        ></div>
        <small className="atr-text">{fabric}</small>
      </div>
    ));
  };

  const extractVariantSleeves = (variants) => {
    const sleeves = variants.map((variant) => variant.option1);
    const uniqueSleeves = [...new Set(sleeves)];

    return uniqueSleeves.map((sleeve, idx) => {
      return (
        <div className="slider_content" key={idx}>
          <div
            className={`slider_circle ${
              customize.sleeve === sleeve ? "selected" : ""
            }`}
            style={{ backgroundColor: "#fff" }}
            onClick={(params) =>
              customDispatch({ type: "SLEEVE", payload: sleeve })
            }
          >
            {<VariantImage imgType={sleeve} />}
          </div>
          <small className="atr-text">{sleeve}</small>
        </div>
      );
    });
  };

  const extractVariantTrousers = () => {
    const trousers = ["Drawstring", "Western", "Drawstring + Western"];

    return trousers.map((trouser, idx) => {
      return (
        <div className="slider_content" key={idx}>
          <div
            className={`slider_circle ${
              customize.trouser === trouser ? "selected" : ""
            }`}
            style={{ backgroundColor: "#fff" }}
            onClick={(params) =>
              customDispatch({ type: "TROUSER", payload: trouser })
            }
          >
            {<VariantImage imgType={trouser} />}
          </div>
          <small className="atr-text">
            {trouser === "Drawstring + Western" ? "Both" : trouser}
          </small>
        </div>
      );
    });
  };

  const extractVariantBreasts = () => {
    const breasts = ["Left Breast", "Right Breast", "No Breast", "Both Breast"];

    return breasts.map((breast, idx) => {
      return (
        <div className="slider_content" key={idx}>
          <div
            className={`slider_circle ${
              customize.breast === breast ? "selected" : ""
            }`}
            style={{ backgroundColor: "#fff" }}
            onClick={(params) =>
              customDispatch({ type: "BREAST", payload: breast })
            }
          >
            {<VariantImage imgType={breast} />}
          </div>
          <small className="atr-text">{breast}</small>
        </div>
      );
    });
  };

  const extractVariantAccessories = () => {
    const accessories = ["Yoruba Hat", "Northern Hat"];

    return accessories.map((accessory, idx) => {
      return (
        <div className="slider_content" key={idx}>
          <div
            className={`slider_circle ${
              customize.accessory === accessory ? "selected" : ""
            }`}
            style={{ backgroundColor: "#cacaca" }}
            onClick={(e) =>
              customDispatch({ type: "ACCESSORIES", payload: accessory })
            }
          ></div>
          <small className="atr-text">{accessory}</small>
        </div>
      );
    });
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    } else {
      setCollapse(!collapse);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = () => {
    if (
      isEmpty(customize.accessory) &&
      isEmpty(customize.breast) &&
      isEmpty(customize.color) &&
      isEmpty(customize.fabric) &&
      isEmpty(customize.sleeve) &&
      isEmpty(customize.trouser)
    ) {
      setShowModal(true);
      setHasError(true);
    } else {
      const payload = {
        variant: selectedVariant,
        options: customize,
      };

      console.log("payload", payload);
      setHasError(false);
      setShowModal(true);
    }
  };



  const onEntering = () => {
    setStatus("opening");
  };

  const onEntered = () => {
    setStatus("opened");
  };

  const onExiting = () => {
    setStatus("closing");
  };

  const onExited = () => {
    setStatus("closed");
  };

  return (
    <div className="main-wrapper">
      <Header>
        <header className="header">
          <h1 className="header_text" id="header-text">
            Step Three: Customize Your Outfit <span id="base-style"></span>
          </h1>
        </header>
      </Header>
      <div className="container">
        <div className="sidebar-container">
          <Sidebar>
            <div className="dots_div">
              <span className="prevBtn" onClick={() => history.goBack()}>
                <img src={backIcon} width="20px" height="20px" />
              </span>
              <span className="dots">
                <span className="step" style={{ background: "#ee435d" }}></span>
                <span className="step" style={{ background: "#ee435d" }}></span>
                <span className="step" style={{ background: "#ee435d" }}></span>
              </span>
            </div>
          </Sidebar>
        </div>

        <div className="content">
          <div className="inner_content" id="customizer_div">
            <div id="customizer">
              <img src={imageSrc} id="featured-img" />
            </div>

            <div className="collapsible-options-wrapper">
              {showModal && (
                <ModalComponent
                  showModal={showModal}
                  toggle={toggleModal}
                  color="primary"
                >
                  {hasError ? (
                    <div><ErrorModal toggle={toggleModal}/></div>
                  ) : (
                    <div><OrderModal handleSubmit={handleSubmit} imageSrc={imageSrc}/></div>
                  )}
                </ModalComponent>
              )}
              <div>
                <div className="tabs tabs--justify">
                  <div className="tabs__wrap">
                    <Nav tabs>
                      <NavItem id="nav-1">
                        <NavLink
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggle("1");
                          }}
                        >
                          Fabric Type <ChevronDownIcon />
                        </NavLink>
                      </NavItem>
                      <NavItem id="nav-2">
                        <NavLink
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            toggle("2");
                          }}
                        >
                          Fabric Color <ChevronDownIcon />
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <Collapse
                      isOpen={!collapse}
                      className="collapse__content"
                      onEntering={onEntering}
                      onEntered={onEntered}
                      onExiting={onExiting}
                      onExited={onExited}
                    >
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <Carousel
                            responsive={responsive}
                            dotListClass={true}
                            slidesToSlide={1}
                            activeIndex={activeIndex}
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            infinite={true}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            arrows={false}
                            renderButtonGroupOutside
                            transitionDuration={500}
                          >
                            {extractVariantFabrics(variants)}
                          </Carousel>
                        </TabPane>
                        <TabPane tabId="2">
                          <Carousel
                            responsive={responsive}
                            dotListClass={true}
                            slidesToSlide={1}
                            activeIndex={activeIndex}
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            infinite={true}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            arrows={false}
                            renderButtonGroupOutside
                            transitionDuration={500}
                          >
                            {extractVariantColors(variants)}
                          </Carousel>
                        </TabPane>
                      </TabContent>
                    </Collapse>
                  </div>
                </div>
              </div>
              <div>
                <div className="tabs tabs--justify">
                  <div className={`tabs__wrap`}>
                    <Nav tabs>
                      <NavItem id="nav-3">
                        <NavLink
                          className={classnames({
                            active: activeTab === "3",
                          })}
                          onClick={() => {
                            toggle("3");
                          }}
                        >
                          Sleeve Length <ChevronDownIcon />
                        </NavLink>
                      </NavItem>
                      <NavItem id="nav-4">
                        <NavLink
                          className={classnames({
                            active: activeTab === "4",
                          })}
                          onClick={() => {
                            toggle("4");
                          }}
                        >
                          Breast Pocket <ChevronDownIcon />
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <Collapse
                      isOpen={!collapse}
                      className="collapse__content"
                      onEntering={onEntering}
                      onEntered={onEntered}
                      onExiting={onExiting}
                      onExited={onExited}
                    >
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="3">
                          <Carousel
                            responsive={responsive}
                            dotListClass={true}
                            slidesToSlide={1}
                            activeIndex={activeIndex}
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            infinite={true}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            arrows={false}
                            renderButtonGroupOutside
                            transitionDuration={500}
                          >
                            {extractVariantSleeves(variants)}
                          </Carousel>
                        </TabPane>
                        <TabPane tabId="4">
                          <Carousel
                            responsive={responsive}
                            dotListClass={true}
                            slidesToSlide={1}
                            activeIndex={activeIndex}
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            infinite={true}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            arrows={false}
                            renderButtonGroupOutside
                            transitionDuration={500}
                          >
                            {extractVariantBreasts()}
                          </Carousel>
                        </TabPane>
                      </TabContent>
                    </Collapse>
                  </div>
                </div>
              </div>
              <div>
                <div className="tabs tabs--justify">
                  <div className={`tabs__wrap`}>
                    <Nav tabs>
                      <NavItem id="nav-5">
                        <NavLink
                          className={classnames({
                            active: activeTab === "5",
                          })}
                          onClick={() => {
                            toggle("5");
                          }}
                        >
                          Trousers <ChevronDownIcon />
                        </NavLink>
                      </NavItem>
                      <NavItem id="nav-6">
                        <NavLink
                          className={classnames({
                            active: activeTab === "6",
                          })}
                          onClick={() => {
                            toggle("6");
                          }}
                        >
                          Accessories <ChevronDownIcon />
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <Collapse
                      isOpen={!collapse}
                      className="collapse__content"
                      onEntering={onEntering}
                      onEntered={onEntered}
                      onExiting={onExiting}
                      onExited={onExited}
                    >
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="5">
                          <Carousel
                            responsive={responsive}
                            dotListClass={true}
                            slidesToSlide={1}
                            activeIndex={activeIndex}
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            infinite={true}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            arrows={false}
                            renderButtonGroupOutside
                            transitionDuration={500}
                          >
                            {extractVariantTrousers()}
                          </Carousel>
                        </TabPane>
                        <TabPane tabId="6">
                          <Carousel
                            responsive={responsive}
                            dotListClass={true}
                            slidesToSlide={1}
                            activeIndex={activeIndex}
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            infinite={true}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            arrows={false}
                            renderButtonGroupOutside
                            transitionDuration={500}
                          >
                            {extractVariantAccessories()}
                          </Carousel>
                        </TabPane>
                      </TabContent>
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer>
          <div className="footer-section--inner">
            <span className="measure_link">
              <Link to="/">
                <p>
                  <img src={qmarkIcon} id="qmark" /> How we get your perfect fit
                </p>
              </Link>
            </span>
            <div className="nextbtn_wrapper">
              <button
                className="nextBtn"
                onClick={(e) => {
                  handleSubmit();
                }}
              >
                <strong>Next:</strong> Submit Order
              </button>
            </div>
          </div>
        </Footer>
      </div>
    </div>
  );
};


export default Customize;
