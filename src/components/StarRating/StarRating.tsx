import { useState } from 'react';
import Star from './Star';

interface StarRatingProps {
  maxRating?: number;
  size?: number;
  defaultRating?: number;
  color?: string;
  onSetRating?: (n: number) => void;
}
export default function StarRating({
  maxRating = 10,
  size = 24,
  defaultRating = 5,
  color = 'orange',
  onSetRating,
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          size={size}
          isSelected={hoverRating > 0 ? hoverRating > i : rating > i}
          color={color}
          onClick={() => {
            setRating(i + 1);
            onSetRating?.(i + 1);
          }}
          onMouseEnter={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );
}
