import VerifyEmail from "../../components/VerifyEmail";

export const dynamic = "force-dynamic";


type PageProps = {
  searchParams: {
    token?: string;
  };
};


export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token;

  return <VerifyEmail token={token} />;
}