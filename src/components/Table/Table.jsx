import "./Table.css";
import Button from "../Button/Button";

export default function Table({ columns, data, actions = [] }) {
  const hasActions = Array.isArray(actions) && actions.length > 0;

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={column.accessor || column.field || index}>
                {column.header || column.label}
              </th>
            ))}
            {hasActions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (hasActions ? 1 : 0)} className="empty-row">
                No hay registros disponibles.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {columns.map((column, colIndex) => {
                  const key = column.accessor || column.field;
                  return (
                    <td key={`${row.id || rowIndex}-${key || colIndex}`}>
                      {row[key]}
                    </td>
                  );
                })}
                {hasActions && (
                  <td className="table-actions">
                    {actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant={action.variant || "secondary"}
                        onClick={() => action.onClick(row)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
