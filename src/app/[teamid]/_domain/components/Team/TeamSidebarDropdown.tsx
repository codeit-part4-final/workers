'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import styles from './TeamSidebarDropdown.module.css';
import chessSmall from '@/assets/icons/chess/chessSmall.svg';
import downArrowSmall from '@/assets/icons/arrow/downArrowSmall.svg';
import plusSmall from '@/assets/icons/plus/plusSMall.svg';
import boardSmall from '@/assets/icons/board/boardSmall.svg';
import { MOCK_TEAMS } from '../../constants/mockData';

export default function TeamSidebarDropdown() {
  const params = useParams<{ teamid: string }>();
  const teamid = params?.teamid ?? '';
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.container}>
      {/* 팀 선택 섹션 */}
      <div className={styles.section}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <span className={styles.triggerLeft}>
            <Image src={chessSmall} alt="" width={20} height={20} />
            <span className={styles.triggerLabel}>팀 선택</span>
          </span>
          <Image
            src={downArrowSmall}
            alt=""
            width={16}
            height={16}
            className={isOpen ? styles.arrowOpen : ''}
          />
        </button>

        {isOpen && (
          <>
            {MOCK_TEAMS.map((team) => (
              <Link
                key={team.id}
                href={`/${team.id}`}
                className={`${styles.teamItem} ${team.id === teamid ? styles.active : ''}`}
              >
                <Image src={chessSmall} alt="" width={20} height={20} />
                <span>{team.name}</span>
              </Link>
            ))}

            <Link href="/addteam/create" className={styles.addButton}>
              <Image src={plusSmall} alt="" width={16} height={16} className={styles.addIcon} />팀
              추가하기
            </Link>
          </>
        )}
      </div>

      {/* 구분선 */}
      <hr className={styles.divider} />

      {/* 자유게시판 */}
      <Link href="/boards" className={styles.boardItem}>
        <Image src={boardSmall} alt="" width={20} height={20} />
        <span>자유게시판</span>
      </Link>
    </div>
  );
}
