// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use serde_json::Value;

#[tauri::command]
fn read_todos() -> Result<Value, String> {
  let data = fs::read_to_string("todos.json").map_err(|e| e.to_string())?;
  let todos: Value = serde_json::from_str(&data).map_err(|e| e.to_string())?;
  Ok(todos)
}

#[tauri::command]
fn write_todos(todos: Value) -> Result<(), String> {
    let data = serde_json::to_string_pretty(&todos).map_err(|e| e.to_string())?;
    fs::write("todos.json", data).map_err(|e| e.to_string())?;
    Ok(())
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![read_todos, write_todos])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
