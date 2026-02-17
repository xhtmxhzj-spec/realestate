'use client';

import { useProperty } from '@/hooks/useProperties';
import { PropertyDetail } from '@/components/features/property/PropertyDetail';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const [id, setId] = useState<string>('');

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const property = useProperty(id);

  if (id && !property) {
    notFound();
  }

  if (!id) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PropertyDetail property={property!} />
    </div>
  );
}
