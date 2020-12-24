import React from 'react';
import DropDown from '../DropDown';

export default function index({ actions, columns = [], items = [] }) {
  return (
    <table className="mt-4 table table-striped table-hovered">
      <thead className="thead-dark">
        <tr>
          {columns.map((column) => (
            <th key={column.name}>{column.value}</th>
          ))}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => {
              if (column.render) {
                const value = item[column.name];
                return <td key={column.name}>{column.render(value)}</td>;
              }

              return <td key={column.name}>{item[column.name]}</td>;
              })}
            <td>
              <DropDown actions={actions} item={item} title="Ações" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}