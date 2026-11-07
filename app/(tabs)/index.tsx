import { useCallback, useRef } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useDiary } from "../../src/context/DiaryContext";
import { useDiarySearch } from "../../src/hooks/useDiarySearch";
import DiaryCard from "../../src/components/DiaryCard";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ['😌', '🎯', '🤩', '😴'];

export default function HomeScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const { 
    query, setQuery, moodFilter, setMoodFilter, resetFilter, filteredEntries, resultCount 
  } = useDiarySearch(entries);
  
  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const openDetail = useCallback((id: number) => {
    router.push({ pathname: "/detail/[id]", params: { id: String(id) } });
  }, [router]);

  const handleReset = useCallback(() => {
    resetFilter();
    searchRef.current?.focus();
  }, [resetFilter]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>
      
      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari diary..."
          placeholderTextColor={COLORS.muted}
          style={styles.search}
        />
        <Pressable onPress={handleReset} style={styles.clearButton}>
          <Text style={styles.clearText}>Reset</Text>
        </Pressable>
      </View>

      <View style={styles.moodFilterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moodScroll}>
          {MOODS.map(mood => (
            <Pressable 
              key={mood} 
              onPress={() => setMoodFilter(mood === moodFilter ? '' : mood)}
              style={[styles.moodBadge, moodFilter === mood && styles.moodBadgeActive]}
            >
              <Text style={styles.moodText}>{mood}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.counter}>{resultCount} entri ditemukan</Text>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Diary tidak ditemukan.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  header: { fontSize: TYPO.h1, fontWeight: "700", color: COLORS.text, marginBottom: SPACE.m },
  searchRow: { flexDirection: "row", gap: SPACE.s },
  search: { 
    flex: 1, borderWidth: 1, borderColor: COLORS.border, 
    borderRadius: 12, padding: 10, backgroundColor: COLORS.surface, color: COLORS.text 
  },
  clearButton: { 
    justifyContent: "center", paddingHorizontal: 14, borderWidth: 1, 
    borderColor: COLORS.border, borderRadius: 12, backgroundColor: COLORS.surface 
  },
  clearText: { color: COLORS.text },
  moodFilterContainer: { marginTop: SPACE.m },
  moodScroll: { gap: SPACE.s },
  moodBadge: {
    paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1,
    borderColor: COLORS.border, borderRadius: 20, backgroundColor: COLORS.surface
  },
  moodBadgeActive: { borderColor: COLORS.accent, backgroundColor: COLORS.border },
  moodText: { fontSize: 16 },
  counter: { color: COLORS.muted, marginVertical: SPACE.s },
  list: { gap: SPACE.m, paddingBottom: SPACE.xl },
  empty: { textAlign: "center", color: COLORS.muted, paddingTop: 40 },
});