import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form, FormGroup, Input, Label, Button,
} from 'reactstrap';

import { toast } from 'react-toastify';
import axios from '../../utils/axios';
import Page from '../../components/Page';
import InputMask from "react-input-mask";
import { cpf } from "cpf-cnpj-validator";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import pt from "date-fns/locale/pt-BR"; // the locale you want
registerLocale("pt-BR", pt); // register it with the name you want

export default function User() {
  const { query: { id }, push } = useRouter();
  const isNewUser = id === 'new';
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    birthday: '',
  });

  const getUser = async () => {
    const response = await axios.get(`/userunidac/${id}`);
    const { data } = response;
    setForm({
      ...data,
    });
  };
  const router = useRouter();

  useEffect(() => {
    if (id && !isNewUser) {
      getUser();
    }
  }, [id]);

  const validCpf = (event) => {
    const { value, name } = event.target;
    let teste = value.replace("_", "")
    if (name == "cpf" && teste.length == 14 && !cpf.isValid(value)) {
      toast.warn("Cpf Inválido");
      setForm({
        ...form,
        [name]: "",
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleDateSelect = (event) => {
    const value  = moment(event).format("DD/MM/YYYY");
    setForm({
      ...form,
      birthday: value,
    });
  }

  const validData = (event) => {
    const { value } = event.target;
    let data = value.split('/')
    //dia
    if (parseInt(data[0]) < 1 || parseInt(data[0]) > 31) {
      alert("dia erro");
    }
    //mês
    if (parseInt(data[1]) < 1 || parseInt(data[1]) > 12) {
      alert("mês erro");
    }//ano
    if (parseInt(data[2]) < 1900 || parseInt(data[0]) > new Date().getFullYear()) {
      alert("ano erro");
    }

  };

  const onChange = (event) => {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const {
      name,
      cpf,
      birthday,
    } = form;
    const formData = {
      name,
      cpf,
      birthday,
    };
    



    try {
      if (isNewUser) {
        await axios.post('/userunidac', formData);
      } else {
        await axios.put(`/userunidac/${id}`, formData);
      }

      toast.success(isNewUser ? 'User Created' : 'User Updated');
      push('/userunidac');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Page title="Usuário Unidac">
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Nome</Label>
          <Input
            name="name"
            maxLength={255}
            onChange={onChange}
            type="text"
            placeholder="Insira o nome do usuário"
            value={form.name}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>CPF</Label>
          <Input
            name="cpf"
            mask="999.999.999-99"
            type="text"
            onChange={validCpf}
            value={form.cpf}
            placeholder="Insira o cpf do usuário"
            tag={InputMask}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Data de aniversário</Label>
          <br/>
          <Input required tag={DatePicker} maxDate={new Date()} minDate={new Date("01-01-1900")} showYearDropdown locale="pt-BR" value={form.birthday} onSelect={handleDateSelect} />
        </FormGroup>
        <Button onClick={() => router.push('/userunidac')}>Cancelar</Button>
        <Button type="submit" className="ml-3" color="primary">Salvar</Button>
      </Form>
    </Page>
  );
}