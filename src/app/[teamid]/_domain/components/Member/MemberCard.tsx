import MemberKebabMenu from './MemberKebabMenu';
import styles from './MemberCard.module.css';
import type { TeamMember } from '../../interfaces/team';
import Image from 'next/image';

interface MemberCardProps {
  member: TeamMember;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar} aria-hidden="true">
        {member.imageUrl ? (
          <Image src={member.imageUrl} alt="" className={styles.avatarImg} />
        ) : (
          <span className={styles.avatarFallback}>{member.name.charAt(0)}</span>
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{member.name}</span>
        <span className={styles.email}>{member.email}</span>
      </div>
      <div className={styles.kebab}>
        <MemberKebabMenu onDelete={() => {}} />
      </div>
    </div>
  );
}
