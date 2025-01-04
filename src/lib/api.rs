pub async fn fetch_tvl() -> Result<f64, Error> {
    let response = reqwest::get("https://api.ultra.markets/tvl")
        .await?
        .json::<serde_json::Value>()
        .await?;
    
    // Assuming the API returns TVL as a number
    Ok(response["tvl"].as_f64().unwrap_or(0.0))
} 