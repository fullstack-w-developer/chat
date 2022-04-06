
interface props {
  img: any;
  name: string;
}

export default function User({ img, name }: props) {

  return (
    <div className="flex items-center p-2 cursor-pointer transition-all shadow-sm">
      <img
        className="rounded-full w-14 h-14 shadow-lg "
        src={`data:image/jpeg;base64,${img}`}
        alt=""
      />
      <p className="text-gray-600 regular text-sm pr-2 text-inherit">{name}</p>
    </div>
  );
}
