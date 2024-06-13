import React, {useEffect} from "react";
import './index.less';

const FloatPanel: React.FC = props => {

  useEffect(() => {
    const draggable = document.getElementById("floatPanel");
    const title = document.getElementById("floatPanelTitle");

    if (!draggable || !title) {
      throw new Error("Draggable or title element not found");
    }

    let isDragging = false;
    let startX: number;
    let startY: number;
    let initialX: number;
    let initialY: number;

    title.addEventListener("mousedown", (event: MouseEvent) => {
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
      const rect = draggable.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;

      title.style.cursor = "grabbing";
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    function onMouseMove(event: MouseEvent) {
      if (!isDragging) return;

      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      if (draggable && draggable.style) {
        let left = initialX + dx - 40;
        if (left < 0) left = 0;

        let top = initialY + dy - 40;
        if (top < 0) top = 0;

        draggable.style.left = `${left}px`;
        draggable.style.top = `${top}px`;
      }
    }

    function onMouseUp() {
      isDragging = false;
      // title.style.cursor = "grab";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  }, []);

  return (
    <div id='floatPanel' className={'float-panel'}>
      <div id="floatPanelTitle" className='float-panel-title'>
        iPhone 15
      </div>
    </div>
  );
}

export default FloatPanel;