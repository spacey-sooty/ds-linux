// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use ds::{Alliance, DriverStation, Mode};
use tauri::generate_handler;

#[tauri::command]
fn enable() {
    DriverStation::new_team(4788, Alliance::new_red(1)).enable();
}

#[tauri::command]
fn disable() {
    DriverStation::new_team(4788, Alliance::new_red(1)).disable();
}

#[tauri::command]
fn select_mode(mode: &str) -> Result<(), String> {
    let mut ds = DriverStation::new_team(4788, Alliance::new_red(1));
    match mode {
        "teleop" => ds.set_mode(Mode::Teleoperated),
        "autonomous" => ds.set_mode(Mode::Autonomous),
        "test" => ds.set_mode(Mode::Test),
        _ => return Err("Cannot find selected mode.".to_string()),
    };

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![disable, enable, select_mode])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}