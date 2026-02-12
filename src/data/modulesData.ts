// Importando as imagens que você já tem para manter a consistência
import inclusivoImg from '../assets/modulo/judo-inclusivo.png';
import introKata from '../assets/modulo/intro-kata.png';
import fundJudo from '../assets/modulo/fund-judo.png';
import arbitragem from '../assets/modulo/arbitragem.png';
import extraGokyo from '../assets/modulo/extra-gokyo.png';
import katameWaza from '../assets/modulo/katame_waza.png';
import didatica from '../assets/modulo/didatica.png';


import senseiJorgeBarrosImg from '../assets/instrutor/sensei_jorge_barros.avif';
import senseiLuizImg from '../assets/instrutor/sensei_luiz.avif';
import yamateImg from '../assets/instrutor/yamate.avif';
import adelinoImg from '../assets/instrutor/adelino.avif';
import anaPaulaImg from '../assets/instrutor/ana_paula.avif';
import irisomarImg from '../assets/instrutor/irisomar.avif';
import sergioImg from '../assets/instrutor/sergio.avif';

// Definindo uma "interface" para o nosso objeto de módulo para garantir que todos tenham os mesmos campos
export interface Instructor {
  name: string;
  avatarUrl: string;
  graduation: string;
  description: string;
}

export interface Module {
  id: number;
  tag: string;
  title: string;
  imageUrl: string;
  instructor: Instructor;
  complementaryContent: {
    videos: { title: string; url: string }[];
    documents: { title: string; url: string }[];
  };
}
export const judoModules: Module[] = [
  {
    id: 1,
    tag: 'Módulo 1',
    title: 'Fundamentos do Judô',
    imageUrl: fundJudo,
    instructor: {
      name: 'José Adelino Mendes',
      avatarUrl: adelinoImg,
      graduation: '7º DAN',
      description: 'Haruki é um especialista nos princípios básicos do Judô, com mais de 20 anos de experiência ensinando crianças e adultos a arte do Caminho Suave.',
    },
    complementaryContent: {
      videos: [
        { title: 'Vídeo: A história do Judô', url: 'https://youtube.com' },
        { title: 'Vídeo: Ukemis (Técnicas de queda)', url: 'https://youtube.com' },
      ],
      documents: [
        { title: 'PDF: Glossário de Termos do Judô', url: '/path/to/doc.pdf' },
      ],
    },
  },
  {
    id: 2, 
    tag: 'Módulo 2', 
    title: 'Extra Go-kyo', 
    imageUrl: extraGokyo,
    instructor: {
      name: 'Irisomar Fernandes Silva',
      avatarUrl: irisomarImg,
      graduation: '7° DAN - CBJ / 6° DAN - KODOKAN',
      description: 'Yuki é uma renomada instrutora de Katas, com reconhecimento internacional pela precisão de seus movimentos e profundidade de seu conhecimento.',
    },
    complementaryContent: {
      videos: [
        { title: 'Vídeo: A história do Judô', url: 'https://youtube.com' },
        { title: 'Vídeo: Ukemis (Técnicas de queda)', url: 'https://youtube.com' },
      ],
      documents: [
        { title: 'PDF: Glossário de Termos do Judô', url: '/path/to/doc.pdf' },
      ],
    },
  },
  {
    id: 3, 
    tag: 'Módulo 3', 
    title: 'Judô inclusivo', 
    imageUrl: inclusivoImg, 
    instructor: {
      name: 'Ana Paula Marça',
      avatarUrl: anaPaulaImg,
      graduation: '1° DAN',
      description: 'Yuki é uma renomada instrutora de Katas, com reconhecimento internacional pela precisão de seus movimentos e profundidade de seu conhecimento.',
    },
    complementaryContent: {
      videos: [
        { title: 'Vídeo: A história do Judô', url: 'https://youtube.com' },
        { title: 'Vídeo: Ukemis (Técnicas de queda)', url: 'https://youtube.com' },
      ],
      documents: [
        { title: 'PDF: Glossário de Termos do Judô', url: '/path/to/doc.pdf' },
      ],
    },
  },
  {
    id: 4, 
    tag: 'Módulo 4', 
    title: 'Nage-waza', 
    imageUrl: 'https://images.unsplash.com/photo-1541696492323-c52b12a2a222?q=80&w=2070&auto=format&fit=crop', 
    instructor: {
      name: 'Sergio Keishiro Barbosa Yamaguchi',
      avatarUrl: sergioImg,
      graduation: '7° DAN',
      description: 'Yuki é uma renomada instrutora de Katas, com reconhecimento internacional pela precisão de seus movimentos e profundidade de seu conhecimento.',
    },
    complementaryContent: {
      videos: [
        { title: 'Vídeo: A história do Judô', url: 'https://youtube.com' },
        { title: 'Vídeo: Ukemis (Técnicas de queda)', url: 'https://youtube.com' },
      ],
      documents: [
        { title: 'PDF: Glossário de Termos do Judô', url: '/path/to/doc.pdf' },
      ],
    },
  },
  {
    id: 5,
    tag: 'Módulo 5',
    title: 'Introdução ao Kata',
    imageUrl: introKata,
    instructor: {
      name: 'Irisomar Fernandes Silva',
      avatarUrl: irisomarImg,
      graduation: '7° DAN - CBJ / 6° DAN - KODOKAN',
      description: 'Yuki é uma renomada instrutora de Katas, com reconhecimento internacional pela precisão de seus movimentos e profundidade de seu conhecimento.',
    },
    complementaryContent: {
      videos: [
        { title: 'Vídeo: Nage-no-Kata - Primeiros 3 golpes', url: 'https://youtube.com' },
      ],
      documents: [
        { title: 'PDF: A Filosofia por trás do Kata', url: '/path/to/doc.pdf' },
      ],
    },
  },
  {
    id: 6, 
    tag: 'Módulo 6', 
    title: 'Arbitragem', 
    imageUrl: arbitragem,
    instructor: {
      name: 'Luiz Mossanori Yamate',
      avatarUrl: yamateImg,
      graduation: '7° DAN',
      description: 'Yuki é uma renomada instrutora de Katas, com reconhecimento internacional pela precisão de seus movimentos e profundidade de seu conhecimento.',
    },
    complementaryContent: {
      videos: [
        { title: 'Vídeo: A história do Judô', url: 'https://youtube.com' },
        { title: 'Vídeo: Ukemis (Técnicas de queda)', url: 'https://youtube.com' },
      ],
      documents: [
        { title: 'PDF: Glossário de Termos do Judô', url: '/path/to/doc.pdf' },
      ],
    },
  },
  {
    id: 7, 
    tag: 'Módulo 7', 
    title: 'Katame-waza', 
    imageUrl: katameWaza,
    instructor: {
      name: 'Jorge Luiz Moraes de Barros',
      avatarUrl: senseiJorgeBarrosImg,
      graduation: '7° DAN',
      description: 'Yuki é uma renomada instrutora de Katas, com reconhecimento internacional pela precisão de seus movimentos e profundidade de seu conhecimento.',
    },
    complementaryContent: {
      videos: [
        { title: 'Vídeo: A história do Judô', url: 'https://youtube.com' },
        { title: 'Vídeo: Ukemis (Técnicas de queda)', url: 'https://youtube.com' },
      ],
      documents: [
        { title: 'PDF: Glossário de Termos do Judô', url: '/path/to/doc.pdf' },
      ],
    },
  },
  {
    id: 8, 
    tag: 'Módulo 8', 
    title: 'Renrakuenka-waza / Kaeshi-waza', 
    imageUrl: 'https://images.unsplash.com/photo-1541696492323-c52b12a2a222?q=80&w=2070&auto=format&fit=crop',
    instructor: {
      name: 'Luiz Carlos Moreira',
      avatarUrl: senseiLuizImg,
      graduation: '7° DAN',
      description: 'Yuki é uma renomada instrutora de Katas, com reconhecimento internacional pela precisão de seus movimentos e profundidade de seu conhecimento.',
    },
    complementaryContent: {
      videos: [
        { title: 'Vídeo: A história do Judô', url: 'https://youtube.com' },
        { title: 'Vídeo: Ukemis (Técnicas de queda)', url: 'https://youtube.com' },
      ],
      documents: [
        { title: 'PDF: Glossário de Termos do Judô', url: '/path/to/doc.pdf' },
      ],
    },
  },
  {
    id: 9, 
    tag: 'Módulo 9', 
    title: 'Didática no ensino do Judô', 
    imageUrl: didatica,
    instructor: {
      name: 'Sergio Keishiro Barbosa Yamaguchi',
      avatarUrl: sergioImg,
      graduation: '7° DAN',
      description: 'Yuki é uma renomada instrutora de Katas, com reconhecimento internacional pela precisão de seus movimentos e profundidade de seu conhecimento.',
    },
    complementaryContent: {
      videos: [
        { title: 'Vídeo: A história do Judô', url: 'https://youtube.com' },
        { title: 'Vídeo: Ukemis (Técnicas de queda)', url: 'https://youtube.com' },
      ],
      documents: [
        { title: 'PDF: Glossário de Termos do Judô', url: '/path/to/doc.pdf' },
      ],
    },
  },
];

