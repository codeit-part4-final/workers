'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './TeamHeader.module.css';

import ThumbnailTeam from '@/assets/icons/img/thumbnail_team.svg';
import SettingBig from '@/assets/icons/setting/SettingBig.svg';
import SettingSmall from '@/assets/icons/setting/settingSmall.svg';

export type TeamHeaderVariant = 'list' | 'team';

export type TeamHeaderProps = {
  variant: TeamHeaderVariant;

  /** API로 받은 팀명 */
  teamName: string;

  /** 팀페이지에서만 사용 (총 인원) */
  memberCount?: number;

  /** 팀페이지에서만 사용 (프로필 이미지 URL들: 1~N) */
  memberImageUrls?: string[];

  /** 설정 페이지로 이동 */
  settingsHref: string;

  className?: string;
};

export default function TeamHeader({
  variant,
  teamName,
  memberCount,
  memberImageUrls,
  settingsHref,
  className,
}: TeamHeaderProps) {
  const resolvedCount = memberCount ?? memberImageUrls?.length ?? 0;

  const visibleAvatars = useMemo(() => {
    return (memberImageUrls ?? []).slice(0, 3);
  }, [memberImageUrls]);

  return (
    <header className={`${styles.container} ${className ?? ''}`} data-variant={variant}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {variant === 'team' ? (
            <div className={styles.teamLeftGroup}>
              <h1 className={styles.teamName}>{teamName}</h1>

              <div className={styles.memberBox} aria-label={`팀 멤버 ${resolvedCount}명`}>
                <div className={styles.avatarStack} aria-hidden="true">
                  {visibleAvatars.map((url, idx) => (
                    <span
                      key={`${url}-${idx}`}
                      className={styles.avatar}
                      style={{ zIndex: visibleAvatars.length - idx }}
                    >
                      <img src={url} alt="" />
                    </span>
                  ))}
                </div>
                <span className={styles.memberCount}>{resolvedCount}</span>
              </div>
            </div>
          ) : (
            <h1 className={styles.teamName}>{teamName}</h1>
          )}
        </div>

        <div className={styles.right}>
          <div className={styles.patternWrap} aria-hidden="true">
            <Image
              src={ThumbnailTeam}
              alt=""
              width={326}
              height={102}
              className={styles.pattern}
              priority
            />
          </div>

          <Link href={settingsHref} className={styles.settingsLink} aria-label="설정">
            <span className={styles.settingBig}>
              <Image src={SettingBig} alt="" />
            </span>
            <span className={styles.settingSmall}>
              <Image src={SettingSmall} alt="" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
