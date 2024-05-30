import Cell from "./Cell";
const Row = ({ item }) => {
  return (
    <tr>
      {/*  Object.entries() method returns an array of a given object's own enumerable string-keyed property [key, value] pairs. */}
      {Object.entries(item).map(([key, value]) => {
        return <Cell key={key} cellData={JSON.stringify(value)} />;
      })}
    </tr>
  );
};
export default Row;
