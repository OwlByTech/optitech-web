type Props = {
  params: {document: number};
};
export default function Page({params}: Props) {
  return <div>Files {params.document}</div>;
}
