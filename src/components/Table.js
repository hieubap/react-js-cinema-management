import React from "react";

function Table({ column = [], data = [] } = {}) {
  return (
    <div>
      <div class="wrapper">
        <div class="table">
          <div class="row-table header">
            {column.map((item) => (
              <div class="cell">{item.title}</div>
            ))}
          </div>

          {data.map((row, rowIdx) => (
            <div class="row-table">
              {column.map((col) => (
                <div class="cell" data-title="Name">
                  {col.renderItem
                    ? col.renderItem(row[col.dataIndex], row, rowIdx)
                    : row[col.dataIndex]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table;
