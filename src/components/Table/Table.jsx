import "./Table.css";
import Button from "../Button/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

export default function Table({ columns, data, actions = [], loading = false }) {
  const hasActions = Array.isArray(actions) && actions.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="table-card"
    >
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
          {loading ? (
            Array(5).fill(0).map((_, rowIndex) => (
              <tr key={`skeleton-${rowIndex}`}>
                {columns.map((_, colIndex) => (
                  <td key={`skeleton-col-${colIndex}`}>
                    <Skeleton height={20} />
                  </td>
                ))}
                {hasActions && (
                  <td>
                    <Skeleton height={30} width={80} />
                  </td>
                )}
              </tr>
            ))
          ) : data.length === 0 ? (
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
                  const value = row[key];
                  return (
                    <td key={`${row.id || rowIndex}-${key || colIndex}`}>
                      {column.render ? column.render(value, row) : value}
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
    </motion.div>
  );
}
