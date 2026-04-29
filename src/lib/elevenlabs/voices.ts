export interface StoryVoiceOption {
  id: string;
  label: string;
  description: string;
}

export const STORY_VOICE_OPTIONS: StoryVoiceOption[] = [
  {
    id: "6GYyziau4Hk8qdg7od5c",
    label: "Varsayılan",
    description: "Genel masal anlatımı",
  },
  {
    id: "FfbOUcE3Zu2P8ZZFLaiW",
    label: "Çocuk Masalı Sıcak",
    description: "Yumuşak ve sıcak anlatım",
  },
  {
    id: "EJGs6dWlD5VrB3llhBqB",
    label: "Neşeli Anlatıcı",
    description: "Canlı ve enerjik okuma",
  },
  {
    id: "mgpcWiEXIWuENJCy8ADX",
    label: "Sakin Uyku Kadın",
    description: "Uyku öncesi sakin ton",
  },
  {
    id: "42ZF7GefiwXbnDaSkPpY",
    label: "Sakin Uyku Erkek",
    description: "Derin ve huzurlu ton",
  },
  {
    id: "cnssGWqE7kJax1MvsjA8",
    label: "Macera",
    description: "Hareketli ve merak uyandıran",
  },
  {
    id: "DUnzBkwtjRWXPr6wRbmL",
    label: "Komik",
    description: "Eğlenceli ve oyunbaz anlatım",
  },
];

export const DEFAULT_STORY_VOICE_ID = STORY_VOICE_OPTIONS[0].id;
