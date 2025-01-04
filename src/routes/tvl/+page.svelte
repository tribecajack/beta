<script lang="ts">
    import { onMount } from 'svelte';
    import { fetch_tvl } from '$lib/api';
    
    let tvl: number = 0;
    let loading = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            tvl = await fetch_tvl();
        } catch (e) {
            error = "Failed to load TVL data";
        } finally {
            loading = false;
        }
    });
</script>

<div class="tvl-container">
    {#if loading}
        <p>Loading TVL data...</p>
    {:else if error}
        <p class="error">{error}</p>
    {:else}
        <h2>Total Value Locked</h2>
        <p class="tvl-value">${tvl.toLocaleString()}</p>
    {/if}
</div>

<style>
    .tvl-container {
        padding: 1rem;
        text-align: center;
    }
    
    .tvl-value {
        font-size: 2rem;
        font-weight: bold;
    }
    
    .error {
        color: red;
    }
</style> 