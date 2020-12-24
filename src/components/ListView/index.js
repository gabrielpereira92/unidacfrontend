import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Table from '../Table';
import Loading from '../Loading';
import axios from '../../utils/axios';

export default function index({ columns, endpoint }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function getItems() {
    setLoading(true);
    const response = await axios.get(endpoint); // carregando
    setItems(response.data); // completo
    setLoading(false);
  }

  const actions = [
    {
      name: 'Editar',
      onClick: ({ id }) => router.push(`${endpoint}/${id}`),
    },
    {
    name: 'Remover',
    onClick: async (item) => {
      if (window.confirm('Tem certeza que deseja remover?')) {
        await axios.delete(`${endpoint}/${item.id}`);

        toast.info('Usuário removido com sucesso');
        await getItems();
      }
    },
  }];

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading color="success" size="lg" />
      ) : (
        <Table actions={actions} columns={columns} items={items} />
      )}
    </div>
  );
}