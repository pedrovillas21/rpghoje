import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CharacterProfile } from "@/components/CharacterProfile";
import { getPersonagem, personagens } from "@/data/personagens";

export const dynamicParams = false;

export function generateStaticParams() {
  return personagens.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/personagem/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPersonagem(slug);
  return { title: p ? `${p.nome} ${p.sobrenome} · RPG hoje` : "RPG hoje" };
}

export default async function PersonagemPage({ params }: PageProps<"/personagem/[slug]">) {
  const { slug } = await params;
  const p = getPersonagem(slug);
  if (!p) notFound();
  return <CharacterProfile p={p} />;
}
