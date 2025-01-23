interface Props {
  label: string;
}

export default function AccessDenied({ label }: Props) {
  return (
    <div className="box-border flex h-screen flex-col items-center justify-start bg-snow p-5 text-3xl text-moss_green antialiased">
      <div className="m-auto w-full text-center align-middle text-4xl font-bold">
        <div>Access Denied</div>
        <div className="font-thin">{label}</div>
      </div>
    </div>
  );
}
