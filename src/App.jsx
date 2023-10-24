import {
  DragFramer,
  HoverFramer,
  SpeedText,
  SpinningShapeShiftingDiv,
} from "./components/FramerTest";

export default function App() {
  return (
    <>
      <div className="flex items-center justify-center">
        {/* <SpinningShapeShiftingDiv />
        <HoverFramer /> */}
        {/* <DragFramer letter={"N"} />
        <DragFramer letter={"O"} />
        <DragFramer letter={"R"} />
        <DragFramer letter={"A"} /> */}
        <SpeedText />
      </div>
    </>
  );
}
