import { Icon } from './Icon';
import { Colors } from '@/theme/mirra';

export function VerifiedBadge({ size = 14 }: { size?: number }) {
  return <Icon name="checkmark.seal.fill" size={size} color={Colors.verified} />;
}
