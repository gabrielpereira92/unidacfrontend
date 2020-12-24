import React from 'react';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import Page from '../../components/Page';
import ListView from '../../components/ListView';

export default function User() {
  const router = useRouter();

  const columns = [
    {
      name: 'name',
      value: 'Nome',
    },
    {
      name: 'cpf',
      value: 'CPF',
    },
    {
      name: 'birthday',
      value: 'Data de aniversário',
    },
  ];

  return (
    <Page title="Usuário Unidac">
      <Button onClick={() => router.push('/userunidac/new')}>Novo usuário</Button>
      <ListView columns={columns} endpoint="/userunidac" />
    </Page>
  );
}