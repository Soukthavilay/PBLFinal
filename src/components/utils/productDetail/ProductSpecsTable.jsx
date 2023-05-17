
function ProductSpecsTable( feature ) {
  const features = feature.feature;
  
  return (
    <>
      <div className="product-specs">
        <div className="product-specs-item">
          <span className="specs-item-title">Color</span>
          <span className="specs-item-subtitle">{features.color ? features.color : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">SSDStorage</span>
          <span className="specs-item-subtitle">{features.SSDStorage ? features.SSDStorage : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">Batteries</span>
          <span className="specs-item-subtitle">{features.batteries ? features.batteries : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">Connectivities</span>
          <span className="specs-item-subtitle">{features.connectivities ? features.connectivities : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">Graphic Series</span>
          <span className="specs-item-subtitle">{features.graphicSeries ? features.graphicSeries : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">Hard Disc Type</span>
          <span className="specs-item-subtitle">{features.hardDiscType ? features.hardDiscType : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">Inches</span>
          <span className="specs-item-subtitle">{features.inches ? features.inches : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">Keyboard Language</span>
          <span className="specs-item-subtitle">{features.keyboardLanguage ? features.keyboardLanguage : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">Operating System</span>
          <span className="specs-item-subtitle">{features.operatingSystem ? features.operatingSystem : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">Processor</span>
          <span className="specs-item-subtitle">{features.processor ? features.processor : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">Ram</span>
          <span className="specs-item-subtitle">{features.ram ? features.ram : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">Storage</span>
          <span className="specs-item-subtitle">{features.storage ? features.storage : ""}</span>
        </div>
        <div className="product-specs-item">
          <span className="specs-item-title">Sim</span>
          <span className="specs-item-subtitle">{ features.sim ? features.sim : ""}</span>
        </div>
      </div>
    </>
  );
}

export default ProductSpecsTable