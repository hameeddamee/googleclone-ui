import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";

import backIcon from "../../../shared/assets/icons/back.svg";
import "../../../shared/Css/App.css";
import "../../../shared/Css/carousel.css";

import * as outfitActions from "../../../redux/actions/outfitActions";
import { isEmpty } from "../../../shared/helpers/validationHelpers";

import Footer from "../../../shared/components/Footer/Footer";
import Header from "../../../shared/components/Header/Header";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import qmarkIcon from "../../../shared/assets/icons/question.svg";
import { Alert } from "reactstrap";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 30,
  },
};

const items = [
  {
    id: 1,
    altText: "Collection 1",
  },
  {
    id: 2,
    altText: "Collection 2",
  },
  {
    id: 3,
    altText: "Collection 3",
  },
  {
    id: 4,
    altText: "Collection 4",
  },
  {
    id: 5,
    altText: "Collection 5",
  },
  {
    id: 6,
    altText: "Collection 6",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(undefined);

  const products = useSelector((state) => state.outfit.products);
console.log(products);
  const isLoading = useSelector((state) => state.outfit.isLoading);

  useEffect(() => {
    dispatch(outfitActions.getCollectionProducts(params.collectionId));
  }, []);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const handleProductSelect = (collectionId) => {
    setSelectedProduct(collectionId);

  };

  const handleNextNav = () => {
    if (!isEmpty(selectedProduct)) {
      history.push(`/outfit/product/${selectedProduct}/customize`);
    } else {
      Alert("Please select from the options")
    }
  };

  return (
    <div className="main-wrapper">
      <Header>
        <header className="header">
          <h1 className="header_text" id="header-text">
            Step Two: Choose your base style
            <span id="selected-style"></span>
          </h1>
        </header>
      </Header>
      <div className="container">
        <div className="sidebar-container">
          <Sidebar>
            <div className="dots_div">
              <span className="prevBtn" onClick={() => history.goBack()}>
                <img src={backIcon} width="25px" height="25px" />
              </span>

              <span className="dots sidebar-dots">
                <span className="step" style={{ background: "#ee435d" }}></span>
                <span className="step" id="step2"></span>
                <span className="step"></span>
              </span>
            </div>
          </Sidebar>
        </div>

        <div className="content">
          <div className="content_main_wrapper">
            <div className="inner_content">
              <Carousel
                responsive={responsive}
                dotListClass={true}
                slidesToSlide={1}
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                swipeable={false}
                draggable={true}
                showDots={true}
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                renderButtonGroupOutside={true}
                transitionDuration={500}
              >
                {products.length > 0 ? (
                  products.map((product) => (
                    <div id="selected_product_img"
                      className={
                        selectedProduct === product.id
                          ? "inner-contents_divs selected_card"
                          : "inner-contents_divs"
                      }
                      key={product.id}
                      onClick={() => handleProductSelect(product.id)}
                    >
                      <img
                        src={product.image ? product.image.src : "Coming Soon"}
                        className="collection-img"
                      />
                      <div className="caption-container">
                        <span className="caption">{product.title}</span>
                     {/* <p className="caption_para">{product.price}</p> */}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Product Not found</div>
                )}
              </Carousel>
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
              <button className="nextBtn" onClick={handleNextNav}>
                <strong>Next:</strong> Customize
              </button>
            </div>
            <div id="footer_dots">
              <span className="indicators">
                <span className="step" style={{ background: "#ee435d" }}></span>
                <span className="step" id="step2"></span>
                <span className="step"></span>
              </span>
            </div>
          </div>
        </Footer>
      </div>
    </div>
  );
};

export default ProductList;
