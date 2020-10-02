import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Carousel from "react-multi-carousel";
import { useSelector, useDispatch } from "react-redux";

import "../../../shared/Css/App.css";
import "../../../shared/Css/responsive.css";

import * as outfitActions from "../../../redux/actions/outfitActions";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import Footer from "../../../shared/components/Footer/Footer";
import Header from "../../../shared/components/Header/Header";
import qmarkIcon from "../../../shared/assets/icons/question.svg";

import "../../../shared/Css/carousel.css";
import { isEmpty } from "../../../shared/helpers/validationHelpers";

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

const Collections = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState(undefined);
  const [animating, setAnimating] = useState(false);
  const [show, setShow] = useState(false);



  const collections = useSelector((state) => state.outfit.collections);
  const isLoading = useSelector((state) => state.outfit.isLoading);
  useEffect(() => {
    dispatch(outfitActions.getOutfitCollections());
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

  const handleCollectionSelect = (collectionId) => {
    setSelectedCollection(collectionId);

  };

  const handleNextNav = () => {
    if (!isEmpty(selectedCollection)) {
      history.push(`/outfit/collection/${selectedCollection}/products`);
    } else{
      alert("Please select from the collection");
    }
  };

  return (
    <div className="main-wrapper">
      <Header>
        <header className="header">
         
          <div>
            <h1 className="header_text" id="header-text">
              Step One: Choose your outfit type
              <span id="selected-style"></span>
            </h1>
          </div>
        </header>
      </Header>
      <div className="container">
        <div className="sidebar-container">
          <Sidebar>
            <div className="dots_div">
              <span className="dots">
                <span className="step" style={{ background: "#ee435d" }}></span>
                <span className="step"></span>
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
                {collections.map((collection) => (
                  <div
                    className={
                      selectedCollection === collection.id
                        ? "inner-contents_divs selected_card"
                        : "inner-contents_divs"
                    }
                    key={collection.id}
                    onClick={() => handleCollectionSelect(collection.id)}
                  >
                    <img
                      src={
                        collection.image ? collection.image.src : "Coming Soon"
                      }
                      className="collection-img"
                    />
                    <div className="caption-container">
                      <span className="caption">{collection.title}</span>
                    {/* <p className="caption_para">{collection.product.price}</p> */}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer>
          <div className="footer-section--inner">
            <div className="measure_link">
              <Link to="/">
                <p>
                  <img src={qmarkIcon} id="qmark" /> How we get your perfect fit
                </p>
              </Link>
            </div>
            <div className="nextbtn_wrapper">
              <button className="nextBtn" onClick={handleNextNav}>
                <strong>Next:</strong> Choose Style
              </button>
            </div>
            <div id="footer_dots">
              <span className="indicators">
                <span className="step" style={{ background: "#ee435d" }}></span>
                <span className="step"></span>
                <span className="step"></span>
              </span>
            </div>
          </div>
        </Footer>
      </div>
    </div>
  );
};

export default Collections;
