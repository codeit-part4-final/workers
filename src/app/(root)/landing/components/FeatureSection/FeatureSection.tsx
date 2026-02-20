import Image, { StaticImageData } from 'next/image';
import gradationFolder from '@/assets/icons/landing/gradation_folder.svg';
import gradationCheck from '@/assets/icons/landing/gradation_check.svg';
import gradationMessage from '@/assets/icons/landing/gradation_message.svg';

import landingPC02 from '@/assets/img/landing/pc/landingPC_02.svg';
import landingPC03 from '@/assets/img/landing/pc/landingPC_03.svg';
import landingPC04 from '@/assets/img/landing/pc/landingPC_04.svg';

import styles from './FeatureSection.module.css';

type Variant = 'two' | 'three' | 'four';

const DATA: Record<
  Variant,
  {
    bg: 'slate' | 'brand';
    height: number;
    icon: StaticImageData;
    titleLines: [string, string];
    desc: string;
    image: StaticImageData;
    imageAlign: 'center' | 'bottom';
    layout: 'textLeft' | 'textRight';
  }
> = {
  two: {
    bg: 'slate',
    height: 800,
    icon: gradationFolder,
    titleLines: ['칸반보드로 함께', '할 일 목록을 관리해요'],
    desc: '팀원과 함께 실시간으로 할 일을 추가하고\n지금 무엇을 해야 하는지 한눈에 볼 수 있어요',
    image: landingPC02,
    imageAlign: 'center',
    layout: 'textLeft',
  },
  three: {
    bg: 'brand',
    height: 750,
    icon: gradationCheck,
    titleLines: ['팀원들과 함께', '할 일을 체크해요'],
    desc: '세부적으로 할 일들을 간편하게 체크해요\n팀원과 빠르게 완료해보세요',
    image: landingPC03,
    imageAlign: 'bottom',
    layout: 'textRight',
  },
  four: {
    bg: 'slate',
    height: 800,
    icon: gradationMessage,
    titleLines: ['할 일 공유를 넘어', '의견을 나누고 함께 결정해요'],
    desc: '댓글로 진행사항을 기록하고 피드백을 주고받으며\n함께 결정을 내릴 수 있어요',
    image: landingPC04,
    imageAlign: 'bottom',
    layout: 'textLeft',
  },
};

export default function FeatureSection({ variant }: { variant: Variant }) {
  const d = DATA[variant];

  return (
    <section
      className={`${styles.section} ${d.bg === 'brand' ? styles.bgBrand : styles.bgSlate}`}
      style={{ height: d.height }}
    >
      <div className={styles.inner}>
        <div className={`${styles.grid} ${d.layout === 'textRight' ? styles.textRight : ''}`}>
          <div className={styles.copy}>
            <div className={styles.icon} aria-hidden="true">
              <Image src={d.icon} alt="" />
            </div>

            {/* 2줄 고정(3줄 방지) */}
            <h2 className={styles.title}>
              {d.titleLines[0]}
              <br />
              {d.titleLines[1]}
            </h2>

            {/* desc는 줄바꿈 유지 */}
            <p className={styles.desc}>{d.desc}</p>
          </div>

          <div className={`${styles.media} ${d.imageAlign === 'bottom' ? styles.bottom : ''}`}>
            <Image src={d.image} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
