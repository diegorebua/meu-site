
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import type { ChatMessage } from '../types';

const props = defineProps<{
  isDarkMode: boolean;
}>();

const isOpen = ref(false);
const messages = ref<ChatMessage[]>([
  { role: 'model', text: 'Olá! Sou seu assistente IA. Como posso ajudar você hoje?' }
]);
const input = ref('');
const isLoading = ref(false);
const scrollRef = ref<HTMLDivElement | null>(null);

const scrollToBottom = () => {
  if (scrollRef.value) {
    scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
  }
};

watch(messages, async () => {
  await nextTick();
  scrollToBottom();
}, { deep: true });

const handleSend = async () => {
  if (!input.value.trim() || isLoading.value) return;

  const userMsg = input.value.trim();
  messages.value.push({ role: 'user', text: userMsg });
  input.value = '';
  isLoading.value = true;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMsg }),
    });

    if (!response.ok) throw new Error('Falha na resposta do servidor');

    const data = await response.json();
    messages.value.push({ role: 'model', text: data.reply });
  } catch (error) {
    console.error("Chat Error:", error);
    messages.value.push({ role: 'model', text: 'Desculpe, estou offline no momento.' });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[60]">
    <button
      v-if="!isOpen"
      @click="isOpen = true"
      :class="['w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95', isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-slate-900 text-white hover:bg-blue-600']"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
    </button>

    <div v-if="isOpen" :class="['w-80 h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border transition-colors', isDarkMode ? 'bg-[#1a1a1a] border-zinc-800' : 'bg-white border-slate-100']">
      <div :class="[isDarkMode ? 'bg-zinc-900' : 'bg-slate-900', 'p-5 flex justify-between items-center']">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">IA</div>
          <span class="font-bold text-white text-sm">Assistente</span>
        </div>
        <button @click="isOpen = false" class="text-white/50 hover:text-white transition-colors">✕</button>
      </div>

      <div ref="scrollRef" :class="['flex-1 p-5 overflow-y-auto space-y-4 text-[13px]', isDarkMode ? 'bg-zinc-950/50' : 'bg-slate-50/50']">
        <div v-for="(m, i) in messages" :key="i" :class="['flex', m.role === 'user' ? 'justify-end' : 'justify-start']">
          <div :class="[
            'max-w-[85%] px-4 py-3 rounded-2xl',
            m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none shadow-md' : (isDarkMode ? 'bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-bl-none' : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-none')
          ]">
            {{ m.text }}
          </div>
        </div>
        <div v-if="isLoading" class="flex justify-start">
          <div :class="['px-4 py-3 rounded-2xl border flex space-x-1', isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-slate-100 shadow-sm']">
            <div :class="['w-1.5 h-1.5 rounded-full animate-bounce', isDarkMode ? 'bg-zinc-600' : 'bg-slate-300']"></div>
            <div :class="['w-1.5 h-1.5 rounded-full animate-bounce delay-75', isDarkMode ? 'bg-zinc-600' : 'bg-slate-300']"></div>
            <div :class="['w-1.5 h-1.5 rounded-full animate-bounce delay-150', isDarkMode ? 'bg-zinc-600' : 'bg-slate-300']"></div>
          </div>
        </div>
      </div>

      <div :class="['p-4 border-t flex space-x-2', isDarkMode ? 'bg-[#1a1a1a] border-zinc-800' : 'bg-white border-slate-100']">
        <input
          v-model="input"
          type="text"
          @keydown.enter="handleSend"
          placeholder="Digite sua mensagem..."
          :class="['flex-1 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 text-sm transition-colors', isDarkMode ? 'bg-zinc-800 text-zinc-200 placeholder-zinc-500 border-none' : 'bg-slate-100 text-slate-800 border-none']"
        />
        <button
          @click="handleSend"
          class="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-xl hover:bg-blue-700 transition-colors"
        >
          ➔
        </button>
      </div>
    </div>
  </div>
</template>
